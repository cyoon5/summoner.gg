import { MatchDto } from "../types/riotMatch";
import getParticipantRunes, { getAccounts, getBans, getMatch, getParticipantItems, getParticipants, getParticipantSpells } from "@/app/services/matchDatabaseTransformer";
import { storeMatchData } from "@/repositories/matchTransaction";

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
        const match = getMatch(rawMatch);
        const accounts = getAccounts(rawMatch);
        const participants = getParticipants(rawMatch);
        const items = getParticipantItems(rawMatch);
        const runes = getParticipantRunes(rawMatch);
        const spells = getParticipantSpells(rawMatch);
        const bans = getBans(rawMatch);
        
        await storeMatchData(match, accounts, participants, items, runes, spells, bans);
    }
}