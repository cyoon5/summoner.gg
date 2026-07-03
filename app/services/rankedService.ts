import { RankedData, RiotRankedResponse } from "../types/ranked";
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
        winRate: (p.wins / (p.wins + p.losses)).toFixed(2).slice(2,4) + "%",
    }));
}


export {getSummonerRankedInfo};