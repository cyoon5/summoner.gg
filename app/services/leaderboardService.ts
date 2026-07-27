const api_key = process.env.RIOT_API_KEY;

async function getChallengerLeagues(region: string, queue: string){

    if(!api_key)
        throw new Error("Missing api key");
    
    const leaderboardURL = `https://${region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${queue}`;
    const response = await fetch(leaderboardURL, {headers: {"X-Riot-Token": api_key}});
    return await response.json();
}


export {getChallengerLeagues}