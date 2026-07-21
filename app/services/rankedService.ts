import { RankedData, RankedDataMini, RiotRankedResponse } from "../types/ranked";
import { SummonerProfile } from "../types/summoner";
const api_key = process.env.RIOT_API_KEY;


async function getSummonerRankedInfo(summoner: SummonerProfile): Promise<RankedData[]>{

    if(!api_key) 
        throw new Error("Missing api key");
    
    const rankedInfoUrl = `https://${summoner.platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${summoner.puuid}`
    const response = await fetch(rankedInfoUrl, {headers: {"X-Riot-Token": api_key}});
    const data = await response.json();

    return data.map((p:RiotRankedResponse): RankedData => ({
        queueType: p.queueType,
        tier: p.tier,
        division: p.rank,
        leaguePoints: p.leaguePoints,
        wins: p.wins,
        losses: p.losses,
        winRate: ((p.wins / (p.wins + p.losses)) * 100).toFixed(0) + "%",
    }));
}

async function getSummonerRankedInfoMini(platform: string, puuid: string): Promise<RankedDataMini | undefined> {

    if(!api_key) 
        throw new Error("Missing api key");
    
    const rankedInfoUrl = `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`
    const response = await fetch(rankedInfoUrl, {headers: {"X-Riot-Token": api_key}});
    const data = await response.json();

    const soloQueue = data.find((p: RiotRankedResponse) => p.queueType === "RANKED_SOLO_5x5");
    
    if(!soloQueue) 
        return undefined;

    return {
        tier: soloQueue.tier,
        division: soloQueue.rank
    }
}

export {getSummonerRankedInfo, getSummonerRankedInfoMini};