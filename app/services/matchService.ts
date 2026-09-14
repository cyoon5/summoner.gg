import { MatchDto } from "../types/riotMatch";
import {transformParticipantRunes, transformAccounts, transformBans, transformMatch, transformParticipantItems, transformParticipants, transformParticipantSpells } from "@/app/services/matchDatabaseTransformer";
import { getClient } from "@/lib/db";
import { findMatchesInDb, getAccounts, getMatch, getParticipantItems, getParticipantRunes, getParticipants, getParticipantSpells } from "@/repositories/matchRepository";
import { storeMatchData } from "@/repositories/matchTransaction";
import { Account, Match, Participant, ParticipantItem, ParticipantRune, ParticipantSpell } from "../types/repository";
import { getApplicationMatchInfo, getApplicationParticipantInfo, getMatchInfo, getMatchParticipantsInfo } from "./matchApplicationTransformer";
import { MatchInfo, ParticipantInfo } from "../types/match";

const api_key = process.env.RIOT_API_KEY;

export async function getMatchList(puuid: string, routing: string ,start: number, count: number): Promise<string[]>{
    if(!api_key) 
        throw new Error("Missing api key");

    const matchListURL = `https://${routing}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`
    const response = await fetch(matchListURL, {headers: {"X-Riot-Token": api_key}});

    return response.json(); //List[string] of Match Ids, currently 10
}

export async function getRawMatches(matchList: string[], puuid: string, routing: string ,start: number, count: number){  

    if(!api_key) 
        throw new Error("Missing api key");

    const promises = matchList.map((matchId:string) => {
        return fetch(
            `https://${routing}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
            {headers: {"X-Riot-Token": api_key}}
        );  
    })
    const responses = await Promise.all(promises); //returns an array of Response Objects
    const data = await Promise.all(responses.map(r => {return r.json()}));
    return data; 
}

export async function processMatches(rawMatches: MatchDto[]){

    for(const rawMatch of rawMatches){
        const match = transformMatch(rawMatch);
        const accounts = transformAccounts(rawMatch);
        const participants = transformParticipants(rawMatch);
        const items = transformParticipantItems(rawMatch);
        const runes = transformParticipantRunes(rawMatch);
        const spells = transformParticipantSpells(rawMatch);
        const bans = transformBans(rawMatch);
        
        await storeMatchData(match, accounts, participants, items, runes, spells, bans);
    }
}


//ordering
export async function getMatchData(puuid: string, routing: string, start: number, count: number){
    const client = await getClient();

    try{
        const matchList: string[] = await getMatchList(puuid, routing, start, count);
        const existingMatches: string[] = await findMatchesInDb(client, matchList);
        const newMatches: string[] = matchList.filter(m => !existingMatches.includes(m));

        const applicationMatchList: MatchInfo[] = [];
        const applicationParticipantList: ParticipantInfo[][] = [];

        if(existingMatches.length > 0){
            for(const match of existingMatches){
                const matchData: Match = await getMatch(client, match);
                const accounts: Account[] = await getAccounts(client, match);
                const participants: Participant[] = await getParticipants(client, match);
                const participantRunes: ParticipantRune[] = await getParticipantRunes(client, match);
                const participantItems: ParticipantItem[] = await getParticipantItems(client, match);
                const participantSpells: ParticipantSpell[] = await getParticipantSpells(client, match);

                const matchInfo: MatchInfo = getApplicationMatchInfo(matchData);
                const participantsInfo: ParticipantInfo[] = getApplicationParticipantInfo(accounts, participants, participantRunes, participantItems, participantSpells);
                applicationMatchList.push(matchInfo);
                applicationParticipantList.push(participantsInfo);
            }
        }

        if(newMatches.length > 0){
            const rawMatches = await getRawMatches(newMatches, puuid, routing, start, count);
            rawMatches.forEach(m => applicationMatchList.push(getMatchInfo(m)));
            for(const participants of getMatchParticipantsInfo(rawMatches)){
                applicationParticipantList.push(participants);
            }
            await processMatches(rawMatches);
        }

        return{
            matchInfoList: applicationMatchList,
            participantsInMatches: applicationParticipantList
        }        
    }
    catch (err){
        console.error("Error in retrieving matches", err);
        throw err;
    } 
    finally{
        client.release();
    }
}

