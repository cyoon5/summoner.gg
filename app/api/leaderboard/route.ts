import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/app/services/leaderboardService';

export default async function GET(request: Request){

    const url =  new URL(request.url);
    const searchParams = url.searchParams;

    const region = searchParams.get('region');
    const queue = searchParams.get('queue');
    const page = Number(searchParams.get('page') ?? 1);

    const pageSize = 10;
    const start = (page - 1) * pageSize;

    if(!region || !queue)
        return NextResponse.json(
            {error: "Missing required params"},
            {status: 400}
        );
    
    const leaderboard = await getLeaderboard(region, queue, start, pageSize);

    return NextResponse.json({
        leaderboard: leaderboard,
        page: page
    });
}