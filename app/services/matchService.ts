import { SummonerProfile } from "../types/summoner";

const api_key = process.env.RIOT_API_KEY;

async function getMatchList(summoner: SummonerProfile){

    if(!api_key) 
        throw new Error("Missing api key")

    const matchListURL = `https://${summoner.routing}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=20`
    const response = await fetch(matchListURL, {headers: {"X-Riot-Token": api_key}});

    return response.json(); //List[string] of Match Ids, currently 20
}

async function getMatch(matchId: string){

}