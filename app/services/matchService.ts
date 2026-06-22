import { SummonerProfile } from "../types/summoner";
import { ParticipantInfo, MatchInfo} from "../types/match";
import { getChampionIconUrl, getCurrentPatch, getItemIconUrl, getSummonerSpellIconUrl } from "./dragonService";
import {getRelativeTime} from "../../lib/unixConverter";

const api_key = process.env.RIOT_API_KEY;
const patch = await getCurrentPatch();

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
            championUrl: getChampionIconUrl(p.championName, patch),
            creepScore: p.neutralMinionsKilled + p.totalMinionsKilled,
            damageDealt: p.totalDamageDealtToChampions,
            summonerSpell1Url: getSummonerSpellIconUrl(p.summoner1Id, patch),
            summonerSpell2Url: getSummonerSpellIconUrl(p.summoner2Id, patch),
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
                    getItemIconUrl(p.item0,patch),
                    getItemIconUrl(p.item1,patch),
                    getItemIconUrl(p.item2,patch),
                    getItemIconUrl(p.item6,patch),
                    getItemIconUrl(p.item4,patch),
                    getItemIconUrl(p.item5,patch),
                    getItemIconUrl(p.item3,patch),
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

     // https://static.developer.riotgames.com/docs/lol/queues.json

    let matchMap = new Map<number, string>();
    matchMap.set(400, "Normal Draft");
    matchMap.set(420, "Ranked Solo/Duo");
    matchMap.set(430, "Normal Blind");
    matchMap.set(440, "Ranked Flex");
    matchMap.set(450, "ARAM");

    const matchInfo: MatchInfo = {
        gameMode: matchMap.get(rawMatchData.info.queueId),
        gameDuration: (rawMatchData.info.gameDuration/60).toFixed(2),
        date: getRelativeTime(rawMatchData.info.gameCreation),
        matchId: rawMatchData.metadata.matchId
    }

    return matchInfo;
}

export {getMatchList, getRawMatches, getMatchInfo, getMatchParticipantsInfo}