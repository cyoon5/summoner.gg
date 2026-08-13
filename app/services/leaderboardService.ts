import { AccountInfo, ApexLeague, ApexLeagueEntry, leaderboardEntry, leaderboardResponse } from "../types/leaderboard";
import { REGION_MAPPING } from "../constants";
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

async function getApexLeagues(region: string, queue: string){

    const [
        challengerLeagues, 
        grandmasterLeagues, 
        masterLeagues
    ] = await Promise.all([
        getChallengerLeagues(region, queue), 
        getGrandmasterLeagues(region, queue), 
        getMasterLeagues(region, queue)
    ]);

    const challenger = challengerLeagues.entries.map(p =>({...p, tier: "challenger"}));
    const grandmaster = grandmasterLeagues.entries.map(p =>({...p, tier: "grandmaster"}))
    const master = masterLeagues.entries.map(p =>({...p, tier: "master"}))
    const apexLeagues = [...challenger, ...grandmaster, ...master].sort((a,b) => b.leaguePoints - a.leaguePoints);

    return apexLeagues;
}

async function getLeaderboard(region: string, queue: string, start: number, count: number): Promise<leaderboardResponse>{

    const apexLeagues = await getApexLeagues(region, queue);

    const totalEntries = apexLeagues.length;
    const totalPages = Math.ceil(totalEntries/count);

    const promises = apexLeagues.slice(start,start + count).map(async (entry: ApexLeagueEntry) => {
        return await getAccountInfo(entry.puuid, region);
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
            region: region,
            leaderboardRanking: (i + start) + 1
        }
        return entry;
    })

    return {
        leaderboard: leaderboardEntries,
        totalEntries: totalEntries,
        totalPages: totalPages
    };
    
}

async function findSummonerOnLeaderboard(region: string, queue: string, count: number, searchedRiotId: string){

    const apexLeagues = await getApexLeagues(region, queue);

    const [gameName, tagLine] = searchedRiotId.split("-");
    const puuid = await getAccountPuuid(region, gameName, tagLine);
    const ladderRank = apexLeagues.findIndex((s: ApexLeagueEntry) => s.puuid === puuid) + 1;

    if(ladderRank === 0)
        throw new Error("Summoner not found");

    const pageNumber = Math.ceil(ladderRank/count);

    return{
        pageNumber,
        puuid
    }
    
}


async function getAccountInfo(puuid: string, region: string): Promise<AccountInfo>{

    if(!api_key)
        throw new Error("Missing api key");

    const accountURL = `https://${REGION_MAPPING.get(region)}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`;
    const response = await fetch(accountURL, {headers: {"X-Riot-Token": api_key}});

    return await response.json();
}

async function getAccountPuuid(region: string, gameName: string, tagLine: string) : Promise<string>{
    if(!api_key)
        throw new Error("Missing api key");

    const puuidURL = `https://${REGION_MAPPING.get(region)}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    const res = await fetch(puuidURL, {headers: {"X-Riot-Token": api_key}});
    const data = await res.json();

    return data.puuid;
}


export {getLeaderboard, findSummonerOnLeaderboard}