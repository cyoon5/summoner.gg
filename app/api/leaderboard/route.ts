import { NextResponse } from 'next/server';
import { findSummonerOnLeaderboard, getLeaderboard } from '@/app/services/leaderboardService';

export async function GET(request: Request){

    const url =  new URL(request.url);
    const searchParams = url.searchParams;

    const region = searchParams.get('region');
    const queue = searchParams.get('queue');
    const page = Number(searchParams.get('page') ?? 1);
    const searchedSummoner = searchParams.get('riotId');

    const pageSize = 10;
    const start = (page - 1) * pageSize;

    if(!region || !queue)
        return NextResponse.json(
            {error: "Missing required params"},
            {status: 400}
        );

    if(searchedSummoner){
        try{
            const result = await findSummonerOnLeaderboard(
                region, 
                queue,
                pageSize, 
                searchedSummoner
            );

            return NextResponse.json(result);
        } 
        catch(error) {
            return NextResponse.json(
                { error: "Summoner not found on leaderboard" },
                { status: 404 }
            );
        }
    

    }
    else{

        const result = await getLeaderboard(region, queue, start, pageSize);

        return NextResponse.json({
            leaderboard: result.leaderboard,
            page: page,
            pageSize: pageSize,
            totalEntries: result.totalEntries,
            totalPages: result.totalPages
        });
    }
}