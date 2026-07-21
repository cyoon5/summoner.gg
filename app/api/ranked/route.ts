import { getSummonerRankedInfoMini } from '@/app/services/rankedService';
import { NextResponse } from 'next/server';

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);

    const puuid = searchParams.get('puuid');
    const platform = searchParams.get('platform');


    if (!puuid || !platform) {
        return NextResponse.json(
            { error: "Missing required parameters" },
            { status: 400 }
        );
    }
    
    const rankInfoPreview = await getSummonerRankedInfoMini(platform, puuid);


    return NextResponse.json({
        rankInfoPreview
    })

}