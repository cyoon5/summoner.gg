export type ChampionProp = {

}

export type ChampionData = {
    champion_key: number;
    matches_played: number;
    pick_rate: number;
    win_rate: number;
    ban_rate: number;
    recommended_runes: RecommendedRunePage;
    highest_wr_stat_shards: RecommendedStatShards;
    primary_rune_tree: number | undefined;
    secondary_rune_tree: number | undefined;
    recommended_spells: RecommendedSummonerSpells;
}

export type RecommendedRunePage = {
    primary_slot_1: number;
    primary_slot_2: number;
    primary_slot_3: number;
    primary_slot_4: number;
    secondary_slot_1: number;
    secondary_slot_2: number;
    win_rate: number;
    matches_used: number;
    wilson_score: number;
}

export type RecommendedStatShards = {
    defense: number;
    flex: number;
    offense: number;
    win_rate: number;
    matches_used: number;
    wilson_score: number;
}

export type RecommendedSummonerSpells = {
    summoner_spell_1: number;
    summoner_spell_2: number;
    win_rate: number;
    matches_used: number;
    wilson_score: number;
}