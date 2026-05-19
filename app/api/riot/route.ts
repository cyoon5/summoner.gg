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
        return NextResponse.json({error:"Missing gameName or tagLine"}, {status: 400})

    const riotapi = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${api_key}`

    const res = await fetch(riotapi);
    const data = await res.json();

    return NextResponse.json(data);
}