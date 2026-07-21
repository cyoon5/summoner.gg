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
    primaryRuneTree: number;
    keystoneUrl: string;
    primaryRunes: [number, number, number, number];
    secondaryRuneTreeUrl: string;
    secondaryRunes: [number, number];
    kills: number;
    deaths: number;
    assists: number;
    kda: string;
    championLevel: number;
    totalGoldEarned: number;
    items: [number, number, number, number, number, number, number];
    itemUrls: [string, string, string, string, string, string, string];
    visionScore: number;
    team: 'red' | 'blue';
    win: boolean;
}

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
    platform: string;
}

export type SummonerRowProp = {
    searchedParticipant: ParticipantInfo;
    participant: ParticipantInfo;
    maxDamage: number;
    platform: string;
}

export type MatchCardDetailProp = {
    participant: ParticipantInfo;
    participants: ParticipantInfo[];
    maxDamage: number;
    platform: string;
}

export type MatchHistoryProp = {
    puuid: string
    routing: string
    platform: string
    initialParticipantsInMatches: ParticipantInfo[][]
    initialSearchedSummoner: (ParticipantInfo | undefined)[]
    initialMatchInfoList: MatchInfo[]
}
