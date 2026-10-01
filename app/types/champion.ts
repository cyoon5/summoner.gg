export type ChampionProp = {

}

export type ChampionData = {
    matches_played: number;
    pick_rate: number;
    win_rate: number;
    ban_rate: number;
    highest_wr_runes: HighestWinRateRunes;
    highest_wr_stat_shards: HighestWinRateStatShards;
}

export type HighestWinRateRunes = {
    primary_slot_1: number;
    primary_slot_2: number;
    primary_slot_3: number;
    primary_slot_4: number;
    secondary_slot_1: number;
    secondary_slot_2: number;
    win_rate: number;
    matches_used: number;
}

export type HighestWinRateStatShards = {
    defense: number;
    flex: number;
    offense: number;
    win_rate: number;
    matches_used: number;
}