import { RankedDataMini } from "./ranked";

export type ParticipantInfo = {
    matchId: string;
    puuid: string;
    gameName: string;
    tagLine: string;
    role: 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'UTILITY';
    championId: number;
    championName: string;
    creepScore: number;
    damageDealt : number;
    summonerSpell1Id: number;
    summonerSpell2Id: number;
    primaryRuneTree: number;
    primaryRuneSelections: number[];
    secondaryRuneTree: number;
    secondaryRuneSelections: number[];
    statPerks: StatPerks;
    kills: number;
    deaths: number;
    assists: number;
    championLevel: number;
    totalGoldEarned: number;
    items: number[];
    visionScore: number;
    team: 'red' | 'blue';
    win: boolean;
}

export type StatPerks = {
    defense: number;
    flex: number;
    offense: number;
};

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
    rank?: RankedDataMini;
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

export type RankPreviewResponse = {
    puuid: string;
    rankInfoPreview: RankedDataMini;
}

export type PostGameProp = {
    participants: ParticipantInfo[];
    participant: ParticipantInfo;
    maxDamage: number;
    platform: string;
    rankPreviewData: RankPreviewResponse[];
};