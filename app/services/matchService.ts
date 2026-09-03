import { ParticipantInfo, MatchInfo} from "../types/match";
import { QUEUE_MAP } from "../constants";

const api_key = process.env.RIOT_API_KEY;

async function getMatchList(puuid: string, routing: string ,start: number, count: number): Promise<string[]>{
    if(!api_key) 
        throw new Error("Missing api key");

    const matchListURL = `https://${routing}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`
    const response = await fetch(matchListURL, {headers: {"X-Riot-Token": api_key}});

    return response.json(); //List[string] of Match Ids, currently 10
}

async function getRawMatches(puuid: string, routing: string ,start: number, count: number){  

    if(!api_key) 
        throw new Error("Missing api key");

    const matchIdList = await getMatchList(puuid, routing, start, count);
    const promises = matchIdList.map((matchId:string) => {
        return fetch(
            `https://${routing}.api.riotgames.com/lol/match/v5/matches/${matchId}`,  //MatchDTO
            {headers: {"X-Riot-Token": api_key}}
        );  
    })
    const responses = await Promise.all(promises); //returns an array of Response Objects
    const data = await Promise.all(responses.map(r => {return r.json()}));
    return data; 
}

 function getMatchParticipantsInfo(rawMatchData: any[]): ParticipantInfo[][]{

    const participantArray = [];

    for(let i = 0; i < rawMatchData.length; i++){

        let currentMatch = rawMatchData[i];
        const participantListRiot = currentMatch.info.participants;

        const participantInfoList = participantListRiot.map((p: any): ParticipantInfo => ({
            matchId: currentMatch.metadata.matchId,
            puuid: p.puuid,
            gameName: p.riotIdGameName,
            tagLine: p.riotIdTagline,
            role: p.teamPosition,
            championId: p.championId,
            championName: p.championName,
            creepScore: p.neutralMinionsKilled + p.totalMinionsKilled,
            damageDealt: p.totalDamageDealtToChampions,
            summonerSpell1Id: p.summoner1Id,
            summonerSpell2Id: p.summoner2Id,
            
            primaryRuneTree: p.perks.styles[0].style,
            primaryRuneSelections: p.perks.styles[0].selections.map((r:any)=> r.perk),
            secondaryRuneTree: p.perks.styles[1].style,
            secondaryRuneSelections: p.perks.styles[1].selections.map((r:any)=> r.perk),
            statPerks: p.perks.statPerks,
            
            kills: p.kills,
            deaths: p.deaths,
            assists: p.assists,
            championLevel: p.champLevel,
            totalGoldEarned: p.goldEarned,
            items: [
                p.item0,
                p.item1,
                p.item2, 
                p.item6, //Trinket
                p.item3,   
                p.item4,
                p.item5,
                p.roleBoundItem
            ],
            visionScore: p.visionScore,
            team: p.teamId == 100? 'blue' : 'red',
            win: p.win
            
        }));

        participantArray.push(participantInfoList);
    }
    
    return participantArray;
}

function getMatchInfo(rawMatchData: any): MatchInfo {

    const matchInfo: MatchInfo = {
        gameMode: QUEUE_MAP.get(rawMatchData.info.queueId),
        gameDuration: rawMatchData.info.gameDuration,
        date: rawMatchData.info.gameEndTimestamp,
        matchId: rawMatchData.metadata.matchId
    }

    return matchInfo;
}

export {getMatchList, getRawMatches, getMatchInfo, getMatchParticipantsInfo}