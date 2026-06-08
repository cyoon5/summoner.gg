
export type MatchSummary =  { //add LP gain/loss once postgres implemented
    matchId: string;
    participants: Array<string>;
    kills: number;
    deaths: number;
    assists: number;
    gameMode: string;
    matchDuration: number;
    matchOutcome: 'win' | 'loss' | 'remake';
    championId: number;
    championName: string;
    items: Array<number>
    role: 'top' | 'jungle' | 'mid' | 'adc' | 'support';
    visionScore: number;
    creepScore: number
    championLevel: number   
    summonerSpell1: number;
    summonerSpell2: number;
}

    // totalMinionsKilled: number;
    // neutralMinionsKilled: number; CS is totalMinionsKilled + neutralMinionsKileld i.e jungle