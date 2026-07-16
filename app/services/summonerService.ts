import { SummonerData, SummonerProfile } from "../types/summoner";
import {getProfileIconUrl} from "../services/dragonService";
import { REGION_MAPPING } from "./constants";
import { notFound } from 'next/navigation';


const api_key = process.env.RIOT_API_KEY;

export async function getSummoner(input: SummonerData): Promise<SummonerProfile> {

    if(!api_key)
        throw new Error("Missing api key");

    const platform = input.region;
    const routing = REGION_MAPPING.get(platform);
    const gameName = input.gameName;
    const tagLine = input.tagLine;


    if (!routing) 
        throw new Error(`Invalid platform: ${platform}`);

    const riotId = `https://${routing}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    const response = await fetch(riotId, {headers: {"X-Riot-Token": api_key}});


    if(response.status === 404)
        notFound();

    if(response.status == 429)
        throw new Error("API Limit Reached");

    if (!response.ok) 
        throw new Error("Failed to fetch account data");

    const accountData = await response.json();
    const puuid = accountData.puuid;

    const riotAcc = `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    const profile = await fetch(riotAcc, {headers: {"X-Riot-Token": api_key}});
    const profileData = await profile.json(); //Contain profileIconId, summonerLevel, revisionDate

    const completeProfileData: SummonerProfile = {
        puuid: puuid,
        gameName: accountData.gameName,
        tagLine: accountData.tagLine,
        platform: platform,
        routing: routing,
        accountLvl: profileData.summonerLevel,
        iconURL: getProfileIconUrl(profileData.profileIconId),
    };

    return completeProfileData;
}


