

export type RankedData = {
    queueType: string;
    tier : string;
    division: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    winRate: string;
}

export type RankedProp = {
    data: RankedData | undefined;
    queueType: string;
}

export type RiotRankedResponse = {
    queueType: string;
    tier: string;
    rank: string;
    puuid: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
}