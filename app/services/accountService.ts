import { ACCOUNT_REGION_MAPPING } from "../constants";
import { AccountInfo } from "../types/leaderboard";

const api_key = process.env.RIOT_API_KEY;

export async function getAccountInfo(puuid: string, region: string): Promise<AccountInfo>{

    if(!api_key)
        throw new Error("Missing api key");

    const accountURL = `https://${ACCOUNT_REGION_MAPPING.get(region)}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`;
    const res = await fetch(accountURL, {headers: {"X-Riot-Token": api_key}});

    if (!res.ok)
        throw new Error("Failed to get account information");

    return res.json();
}

export async function getAccountPuuid(region: string, gameName: string, tagLine: string) : Promise<string>{

    if(!api_key)
        throw new Error("Missing api key");

    const puuidURL = `https://${ACCOUNT_REGION_MAPPING.get(region)}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    const res = await fetch(puuidURL, {headers: {"X-Riot-Token": api_key}});

    if (!res.ok)
        throw new Error("Failed to get puuid");

    const data = await res.json();

    return data.puuid;
}