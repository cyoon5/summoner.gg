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
    try {
        const matches = await getMatchData(puuid, routing, start, count);
        const matchInfoList = matches.map(m => m.match);
        const participantsInMatches = matches.map(m => m.participants);
        const searchedSummoner = participantsInMatches.map(ps => ps.find(p => p.puuid === puuid));

        return NextResponse.json({ searchedSummoner, participantsInMatches, matchInfoList });

    } catch (err) {
        console.error('[/api/matches]', err);
        
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Internal error' },
            { status: 500 }
        );
    }

}