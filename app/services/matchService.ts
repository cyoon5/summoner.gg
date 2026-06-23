import { SummonerProfile } from "../types/summoner";
import { ParticipantInfo, MatchInfo} from "../types/match";
import { getChampionIconUrl, getItemIconUrl, getSummonerSpellIconUrl, getRuneIconUrl } from "./dragonService";
import {getRelativeTime} from "../../lib/unixConverter";
import { QUEUE_MAP } from "./constants";

const api_key = process.env.RIOT_API_KEY;

async function getMatchList(summoner: SummonerProfile): Promise<string[]>{
    if(!api_key) 
        throw new Error("Missing api key");

    const matchListURL = `https://${summoner.routing}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=10`
    const response = await fetch(matchListURL, {headers: {"X-Riot-Token": api_key}});

    return response.json(); //List[string] of Match Ids, currently 10
}

async function getRawMatches(summoner: SummonerProfile){  

    if(!api_key) 
        throw new Error("Missing api key");

    const matchIds = await getMatchList(summoner);

    const promises = matchIds.map((matchId:string) => {
        return fetch(
            `https://${summoner.routing}.api.riotgames.com/lol/match/v5/matches/${matchId}`,  //MatchDTO
            {headers: {"X-Riot-Token": api_key}}
        );  
    })

    const responses = await Promise.all(promises); //This returns an array of Response Objects
    const data = await Promise.all(responses.map(r => {return r.json()}));
    return data; 
}

 function getMatchParticipantsInfo(rawMatchData: any): ParticipantInfo[][]{

    const participantArray = [];

    for(let i = 0; i < rawMatchData.length; i++){

        let currentMatch = rawMatchData[i];
        const participantListRiot = currentMatch.info.participants;

        const participantInfoList = participantListRiot.map((p: any) => ({
            matchId: currentMatch.metadata.matchId,
            puuid: p.puuid,
            gameName: p.riotIdGameName,
            tagLine: p.riotIdTagline,
            role: p.teamPosition,
            championId: p.championId,
            championName: p.championName,
            championUrl: getChampionIconUrl(p.championName),
            creepScore: p.neutralMinionsKilled + p.totalMinionsKilled,
            damageDealt: p.totalDamageDealtToChampions,
            summonerSpell1Url: getSummonerSpellIconUrl(p.summoner1Id),
            summonerSpell2Url: getSummonerSpellIconUrl(p.summoner2Id),
            primaryRuneTree: p.perks.styles[0].style,
            keystoneUrl: getRuneIconUrl(p.perks.styles[0].selections[0].perk),
            primaryRunes: p.perks.styles[0].selections,
            secondaryRuneTreeUrl: getRuneIconUrl(p.perks.styles[1].style),
            secondaryRunes: p.perks.styles[0].selections,
            kills: p.kills,
            deaths: p.deaths,
            assists: p.assists,
            kda: ((p.kills + p.assists)/(p.deaths || 1)).toFixed(2),
            championLevel: p.champLevel,
            totalGoldEarned: p.goldEarned,
            items: 
                [
                    p.item0,
                    p.item1,
                    p.item2, 
                    p.item3,   
                    p.item4,
                    p.item5,
                    p.item6,
                ],
            itemUrls: 
                [
                    getItemIconUrl(p.item0),
                    getItemIconUrl(p.item1),
                    getItemIconUrl(p.item2),
                    getItemIconUrl(p.item6), //trinket
                    getItemIconUrl(p.item3),
                    getItemIconUrl(p.item4),
                    getItemIconUrl(p.item5),
                ],
            visionScore: p.visionScore,
            team: p.teamId == 100? 'blue' : 'red',
            win: p.win
        }));

        participantArray.push(participantInfoList);
    }
    
    return participantArray;
}




function getMatchInfo(rawMatchData: any): MatchInfo{

    const matchInfo: MatchInfo = {
        gameMode: QUEUE_MAP.get(rawMatchData.info.queueId),
        gameDuration: (rawMatchData.info.gameDuration/60).toFixed(2),
        date: getRelativeTime(rawMatchData.info.gameCreation),
        matchId: rawMatchData.metadata.matchId
    }

    return matchInfo;
}

export {getMatchList, getRawMatches, getMatchInfo, getMatchParticipantsInfo}