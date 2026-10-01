export type ChampionProp = {

}

export type ChampionData = {
    matches_played: number;
    pick_rate: number;
    win_rate: number;
    ban_rate: number;
    highest_wr_runes: HighestWinRateRunes;
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