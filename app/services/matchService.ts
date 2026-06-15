import { SummonerProfile } from "../types/summoner";
import { ParticipantInfo, MatchInfo} from "../types/match";

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

    const promises = matchIds.map((matchId:any) => {
        return fetch(
            `https://${summoner.routing}.api.riotgames.com/lol/match/v5/matches/${matchId}`,  //MatchDTO
            {headers: {"X-Riot-Token": api_key}}
        );  
    })

    const responses = await Promise.all(promises); //This returns an array of Response Objects
    const data = await Promise.all(responses.map(r => {return r.json()}));
    return data; 
}

//Return an 10 arrays, each array holding 10 participants
//TODO: Refactor and Optimize this page, as it can use a map instead of for loop
 function getMatchParticipantsInfo(rawMatchData: any): ParticipantInfo[][]{

    const participantArray = [];


    for(let i = 0; i < rawMatchData.length; i++){

        let currentMatch = rawMatchData[i];
        const participantListRiot = currentMatch.info.participants;

        const participantInfoList = participantListRiot.map((p:any) => ({
            puuid: p.puuid,
            gameName: p.riotIdGameName,
            tagLine: p.riotIdTagline,
            role: p.teamPosition,
            championId: p.championId,
            championName: p.championName,
            creepScore: p.neutralMinionsKilled + p.totalMinionsKilled,
            damageDealt: p.totalDamageDealtToChampions,
            summonerSpell1: p.summoner1Id,
            summonerSpell2: p.summoner2Id,
            kills: p.kills,
            deaths: p.deaths,
            assists: p.assists,
            kda: (p.kills + p.assists)/(p.deaths || 1), //0 is falsy in JS
            champLevel: p.championLevel,
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
            team: p.teamId == 100? 'blue' : 'red'
        }));

        participantArray.push(participantInfoList);
    }
        



    return participantArray;
}




async function getMatchInfo(rawMatchData: any): Promise<MatchInfo>{

     // https://static.developer.riotgames.com/docs/lol/queues.json

    let matchMap = new Map<number, string>();
    matchMap.set(400, "Normal Draft");
    matchMap.set(420, "Ranked Solo/Duo");
    matchMap.set(430, "Normal Blind");
    matchMap.set(440, "Ranked Flex");
    matchMap.set(450, "ARAM");

    const matchInfo: MatchInfo = {
        gameMode: matchMap.get(rawMatchData.info.queueId),
        gameDuration: rawMatchData.info.gameDuration,
        date: rawMatchData.info.gameCreation
    }

    return matchInfo;
}

export {getMatchList, getRawMatches, getMatchInfo, getMatchParticipantsInfo}