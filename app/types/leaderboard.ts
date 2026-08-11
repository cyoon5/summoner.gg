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
    leaderboardRanking: number;
}

export type leaderboardResponse={
    leaderboard: leaderboardEntry[]
    totalEntries: number,
    totalPages: number;
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

export type PodiumPlayers = leaderboardEntry & {
    profileIconUrl: string;
    summonerLevel: number;
}

