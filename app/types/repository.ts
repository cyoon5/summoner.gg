export type Account = {
    puuid: string,
    game_name: string,
    tag_line: string,
    platform: string
}

export type Match = {
    match_id: string
    queue_id: number,
    match_duration: number,
    match_date: Date,
    game_version: string
}

export type Participant = {
    puuid: string,
    match_id: string,
    champion_id: string,
    kills: number,
    deaths: number,
    assists: number,
    role: string,
    creep_score: number,
    damage_dealt: number,
    gold: number,
    champion_level: number,
    vision_score: number,
    team: string,
    win: boolean
}

export type ParticipantRune = {
    puuid: string,
    match_id: string,
    slot_type: 'PRIMARY_KEYSTONE' | 'PRIMARY_SLOT_1' | 'PRIMARY_SLOT_2' | 'PRIMARY_SLOT_3' | 'SECONDARY_SLOT_1' | 'SECONDARY_SLOT_2' | 'OFFENSE' | 'FLEX' | 'DEFENSE',
    rune_id: number
}

export type ParticipantItem = {
    puuid: string,
    match_id: string,
    item_id: number
}

export type ParticipantSpell = {
    puuid: string,
    match_id: string,
    spell_id: number
}

export type RankSnapshot = {
    puuid: string,
    tier: string,
    division: string,
    league_points: number,
    snapshot_date: Date
}