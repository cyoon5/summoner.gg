import { NextResponse } from 'next/server';
import { getMatchData } from '@/app/services/matchService';

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);

    const puuid = searchParams.get('puuid');
    const routing = searchParams.get('routing');
    const start = parseInt(searchParams.get('start') ?? '0');
    const count = parseInt(searchParams.get('count') ?? '10');


    if (!puuid || !routing || isNaN(start) || isNaN(count)) {
        return NextResponse.json(
            { error: "Missing required parameters" },
            { status: 400 }
        );
    }
    const matches = await getMatchData(puuid, routing, start, count);
    const matchInfoList = matches.map(m => m.match);
    const participantsInMatches = matches.map(p => p.participants);
    const searchedSummoner = participantsInMatches.map(m => m.find(p => p.puuid === puuid));


    return NextResponse.json({
        searchedSummoner,
        participantsInMatches, //Array of participant for 10 games, i.e. 100 people
        matchInfoList
    })

}