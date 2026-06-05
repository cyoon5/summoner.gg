import { SummonerData } from "../types/summoner";

const api_key = process.env.RIOT_API_KEY;

export async function getSummoner(input: SummonerData) {
    //If multiple services require it, would be better to make a new file constants.ts for example, import from 1 place

    if(!api_key)
        throw new Error("Missing api key");
    
    const regionMapping = new Map<string, string>();
    regionMapping.set('na1', 'americas'); //(platform, routing)
    regionMapping.set('euw1', 'europe');

    const platform = input.region;
    const routing = regionMapping.get(platform);
    const gameName = input.gameName;
    const tagLine = input.tagLine;

    const riotId = `https://${routing}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    const response = await fetch(riotId, {headers: {"X-Riot-Token": api_key}});
    const accountData = await response.json();
    const puuid = accountData.puuid;

    const riotAcc = `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    const profile = await fetch(riotAcc, {headers: {"X-Riot-Token": api_key}});
    const profileData = await profile.json(); //Contain profileIconId, summonerLevel
    


    return profileData;



}