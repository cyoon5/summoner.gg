import { AccountInfo, ApexLeague, ApexLeagueEntry, leaderboardEntry } from "../types/leaderboard";
import { REGION_MAPPING } from "./constants";
const api_key = process.env.RIOT_API_KEY;

async function getChallengerLeagues(region: string, queue: string): Promise<ApexLeague>{

    if(!api_key)
        throw new Error("Missing api key");
    
    const leaderboardURL = `https://${region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${queue}`;
    const response = await fetch(leaderboardURL, {headers: {"X-Riot-Token": api_key}});

    if(!response.ok)
        throw new Error("Failed to get challenger queues");

    return await response.json();    
}

async function getGrandmasterLeagues(region: string, queue: string): Promise<ApexLeague>{

    if(!api_key)
        throw new Error("Missing api key");
    
    const leaderboardURL = `https://${region}.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/${queue}`;
    const response = await fetch(leaderboardURL, {headers: {"X-Riot-Token": api_key}});

    if(!response.ok)
        throw new Error("Failed to get grandmaster queues");

    return await response.json();    
}

async function getMasterLeagues(region: string, queue: string): Promise<ApexLeague>{

    if(!api_key)
        throw new Error("Missing api key");
    
    const leaderboardURL = `https://${region}.api.riotgames.com/lol/league/v4/masterleagues/by-queue/${queue}`;
    const response = await fetch(leaderboardURL, {headers: {"X-Riot-Token": api_key}});

    if(!response.ok)
        throw new Error("Failed to get master queues");

    return await response.json();    
}

async function getLeaderboard(region: string, queue: string, start: number, count: number): Promise<leaderboardEntry[]>{

    const [
            challengerLeagues, 
            grandmasterLeagues, 
            masterLeagues
          ] = await Promise.all(
          [
            getChallengerLeagues(region, queue), 
            getGrandmasterLeagues(region, queue), 
            getMasterLeagues(region, queue)
          ]);

    const challenger = challengerLeagues.entries.map(p =>({...p, tier: "challenger"}));
    const grandmaster = grandmasterLeagues.entries.map(p =>({...p, tier: "grandmaster"}))
    const master = masterLeagues.entries.map(p =>({...p, tier: "master"}))
    const apexLeagues = [...challenger, ...grandmaster, ...master].sort((a,b) => b.leaguePoints - a.leaguePoints);

    const promises = apexLeagues.slice(start,start + count).map(async (entry: ApexLeagueEntry) =>{
        return await getAccountInfo(entry.puuid, region)
    })

    const leaderboardAccounts: AccountInfo[] = await Promise.all(promises);

    const leaderboardEntries = leaderboardAccounts.map((p,i) => {
        const entry: leaderboardEntry = {
            puuid: p.puuid,
            gameName: p.gameName,
            tagLine: p.tagLine,
            tier: apexLeagues[i + start].tier,
            division: apexLeagues[i + start].division,
            leaguePoints: apexLeagues[i + start].leaguePoints,
            wins: apexLeagues[i + start].wins,
            losses: apexLeagues[i + start].losses,
            region: region
        }
        return entry;
    })

    return leaderboardEntries;
    
}

async function getAccountInfo(puuid: string, region: string): Promise<AccountInfo>{

    if(!api_key)
        throw new Error("Missing api key");

    const accountURL = `https://${REGION_MAPPING.get(region)}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`;
    const response = await fetch(accountURL, {headers: {"X-Riot-Token": api_key}});

    return await response.json();
}



export {getChallengerLeagues, getLeaderboard}