

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
    summonerSpell1Url: string;
    summonerSpell2Url: string;
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
    gameDuration: string;
    date: string;
    matchId: string;
}

export type MatchCardProp = {
    participant: ParticipantInfo;
    participants: ParticipantInfo[];
    matchInfo: MatchInfo;
}