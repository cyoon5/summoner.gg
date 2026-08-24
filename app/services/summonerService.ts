import { SummonerData, SummonerProfile } from "../types/summoner";
import {getProfileIconUrl} from "../services/dragonService";
import { ACCOUNT_REGION_MAPPING, MATCH_REGION_MAPPING } from "../constants";
import { notFound } from 'next/navigation';
import { SummonerInfo } from "../types/leaderboard";

const api_key = process.env.RIOT_API_KEY;

export async function getSummoner(account: SummonerData): Promise<SummonerProfile> {

    if(!api_key)
        throw new Error("Missing api key");

    const platform = account.region; //e.g. na1
    const accountRouting = ACCOUNT_REGION_MAPPING.get(platform); //Account-v1
    const matchRouting = MATCH_REGION_MAPPING.get(platform); //Match-v5
    const gameName = account.gameName;
    const tagLine = account.tagLine;


    if (!accountRouting || !matchRouting) 
        throw new Error(`Invalid platform: ${platform}`);

    const accountDataLink = `https://${accountRouting}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    const response = await fetch(accountDataLink, {headers: {"X-Riot-Token": api_key}});


    if(response.status == 429)
        throw new Error("API Limit Reached");
    if(response.status === 404)
        notFound();
    if (!response.ok) 
        throw new Error("Failed to fetch account data");

    const accountData = await response.json(); //AccountDto
    const puuid = accountData.puuid;

    const lolAccount = `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    const profile = await fetch(lolAccount, {headers: {"X-Riot-Token": api_key}});
    const profileData = await profile.json(); //Contain profileIconId, summonerLevel, revisionDate

    const completeProfileData: SummonerProfile = {
        puuid: puuid,
        gameName: accountData.gameName,
        tagLine: accountData.tagLine,
        platform: platform,
        accountRouting: accountRouting,
        matchRouting: matchRouting,
        accountLvl: profileData.summonerLevel,
        iconURL: getProfileIconUrl(profileData.profileIconId),
    };

    return completeProfileData;
}


export async function getSummonerInfo(puuid: string, region: string): Promise<SummonerInfo>{
    if(!api_key)
        throw new Error("Missing api key");

    const summonerURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    const res = await fetch(summonerURL, {headers: {"X-Riot-Token": api_key}});

    if (!res.ok)
        throw new Error("Failed to get summoner info");

    const data = await res.json();

    return {
        puuid: data.puuid,
        profileIconId: data.profileIconId,
        summonerLevel: data.summonerLevel
    }
}



