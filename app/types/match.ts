
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
    items: [number, number, number, number, number, number, number]
    role: 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'UTILITY';
    visionScore: number;
    creepScore: number
    championLevel: number   
    summonerSpell1: number;
    summonerSpell2: number;
}

export type ParticipantInfo = {
    matchId: string;
    puuid: string;
    gameName: string;
    tagLine: string;
    role: 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'UTILITY';
    championId: number;
    championName: string;
    championUrl: string;
    creepScore: number;
    damageDealt : number;
    summonerSpell1: number;
    summonerSpell2: number;
    //runes
    kills: number;
    deaths: number;
    assists: number;
    kda: number;
    championLevel: number;
    totalGoldEarned: number;
    items: [number, number, number, number, number, number, number];
    itemUrls: [string, string, string, string, string, string, string];
    visionScore: number;
    team: 'red' | 'blue';
    win: boolean;
}

    // totalMinionsKilled: number;
    // neutralMinionsKilled: number; CS is totalMinionsKilled + neutralMinionsKilled i.e JUNGLE


export type MatchInfo = {
    gameMode: string | undefined;
    gameDuration: number;
    date: number;
    matchId: string;
}

export type MatchCardProp = {
    participant: ParticipantInfo;
    participants: ParticipantInfo[];
    matchInfo: MatchInfo;
}