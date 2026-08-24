import { SummonerData, SummonerProfile } from "../types/summoner";
import {getProfileIconUrl} from "../services/dragonService";
import { ACCOUNT_REGION_MAPPING, MATCH_REGION_MAPPING } from "../constants";
import { SummonerInfo } from "../types/leaderboard";
import { getAccountPuuid } from "./accountService";
import { SummonerNotFoundError } from "../errors/SummonerNotFoundError";

const api_key = process.env.RIOT_API_KEY;

export async function getSummoner(account: SummonerData): Promise<SummonerProfile> {

    const platform = account.region; //e.g. na1
    const gameName = account.gameName;
    const tagLine = account.tagLine;
    const accountRouting = ACCOUNT_REGION_MAPPING.get(platform); //Account-v1
    const matchRouting = MATCH_REGION_MAPPING.get(platform); //Match-v5

    if (!accountRouting || !matchRouting) 
        throw new Error(`Invalid platform: ${platform}`);

    const puuid = await getAccountPuuid(platform, gameName, tagLine);
    const summonerAccount = await getSummonerInfo(puuid, platform);

    return {
        puuid: puuid,
        gameName: gameName,
        tagLine: tagLine,
        platform: platform,
        accountRouting: accountRouting,
        matchRouting: matchRouting,
        accountLvl: summonerAccount.summonerLevel,
        iconURL: getProfileIconUrl(summonerAccount.profileIconId),
    };

}


export async function getSummonerInfo(puuid: string, platform: string): Promise<SummonerInfo>{
    
    if(!api_key)
        throw new Error("Missing api key");

    const summonerURL = `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    const res = await fetch(summonerURL, {headers: {"X-Riot-Token": api_key}});


    if(res.status === 404) 
        throw new SummonerNotFoundError();
    if (!res.ok)
        throw new Error("Failed to get summoner info");

    const data = await res.json();

    return {
        puuid: data.puuid,
        profileIconId: data.profileIconId,
        summonerLevel: data.summonerLevel
    }
}



