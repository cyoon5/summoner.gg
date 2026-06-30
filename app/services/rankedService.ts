import { SummonerProfile } from "../types/summoner";
const api_key = process.env.RIOT_API_KEY;


async function getSummonerRankedInfo(summoner: SummonerProfile){
    if(!api_key) 
        throw new Error("Missing api key");
    
    const rankedInfoUrl = `https://${summoner.platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${summoner.puuid}`
    const response = await fetch(rankedInfoUrl, {headers: {"X-Riot-Token": api_key}});
    const data = await response.json();
    return data;
}


export {getSummonerRankedInfo};