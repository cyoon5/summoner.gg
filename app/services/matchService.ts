const api_key = process.env.RIOT_API_KEY;

export async function getMatchList(puuid: string, routing: string ,start: number, count: number): Promise<string[]>{
    if(!api_key) 
        throw new Error("Missing api key");

    const matchListURL = `https://${routing}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`
    const response = await fetch(matchListURL, {headers: {"X-Riot-Token": api_key}});

    return response.json(); //List[string] of Match Ids, currently 10
}

export async function getRawMatches(puuid: string, routing: string ,start: number, count: number){  

    if(!api_key) 
        throw new Error("Missing api key");

    const matchIdList = await getMatchList(puuid, routing, start, count);
    const promises = matchIdList.map((matchId:string) => {
        return fetch(
            `https://${routing}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
            {headers: {"X-Riot-Token": api_key}}
        );  
    })
    const responses = await Promise.all(promises); //returns an array of Response Objects
    const data = await Promise.all(responses.map(r => {return r.json()}));
    return data; 
}