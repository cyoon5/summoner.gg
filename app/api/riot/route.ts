import { NextResponse } from "next/server";
const api_key = process.env.RIOT_API_KEY;

export async function GET(request: Request) {

    if(!api_key)
        throw new Error("Missing api key");

    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const gameName = searchParams.get('gameName');
    const tagLine = searchParams.get('tagLine');

    if(!gameName || !tagLine)
        return NextResponse.json({error:"Missing gameName or tagLine"}, {status: 400});

    const riotapi = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${api_key}`;

    const res = await fetch(riotapi);
    const accountRes = await res.json(); //returns puuid, need to chain into getting match id, MATCH-V5
    const puuid = accountRes.puuid;

    const sres = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${api_key}`);
    const summonerObj = await sres.json();

    console.log(summonerObj);

    return NextResponse.json(summonerObj);
}