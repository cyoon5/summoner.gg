import { ACCOUNT_REGION_MAPPING } from "../constants";
import { SummonerNotFoundError } from "../errors/SummonerNotFoundError";
import { AccountInfo } from "../types/leaderboard";

const api_key = process.env.RIOT_API_KEY;

export async function getAccountInfoByPuuid(puuid: string, platform: string): Promise<AccountInfo>{

    if(!api_key)
        throw new Error("Missing api key");

    const accountURL = `https://${ACCOUNT_REGION_MAPPING.get(platform)}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`;
    const res = await fetch(accountURL, {headers: {"X-Riot-Token": api_key}});

    if (res.status === 404) 
        throw new SummonerNotFoundError();
    if (!res.ok)
        throw new Error("Failed to get account information");

    return res.json();
}

export async function getAccountInfoByNameTag(platform: string, gameName: string, tagLine: string): Promise<AccountInfo>{

    if(!api_key)
        throw new Error("Missing api key");

    const puuidURL = `https://${ACCOUNT_REGION_MAPPING.get(platform)}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    const res = await fetch(puuidURL, {headers: {"X-Riot-Token": api_key}});

    if (res.status === 404) 
        throw new SummonerNotFoundError();
    if (!res.ok)
        throw new Error("Failed to get account information");

    const data = await res.json();

    return {
        puuid: data.puuid,
        gameName: data.gameName,
        tagLine: data.tagLine
    };
}