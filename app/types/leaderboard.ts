export type leaderboardEntry={
    puuid: string;
    gameName: string;
    tagLine: string;
    tier: string;
    division: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    region: string;
}

export type ApexLeagueEntry={
    puuid: string;
    leaguePoints: number;
    tier: string;
    division: string;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
}

export type ApexLeague={
    tier: string;
    queue: string;
    entries: ApexLeagueEntry[];
}

export type AccountInfo={
    puuid: string;
    gameName: string;
    tagLine: string;
}