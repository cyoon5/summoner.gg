import { Account, ChampionBan, Match, Participant, ParticipantItem, ParticipantRune, ParticipantSpell, RankSnapshot } from "@/app/types/repository";
import { Client, Result } from "pg";

//https://github.com/RiotGames/developer-relations/issues/759
//platform i.e. na1

export async function insertAccount(client: Client, account: Account){
    const params = [
        account.puuid, 
        account.game_name, 
        account.tag_line, 
        account.platform
    ];

    const statement = `
        INSERT INTO account(puuid, game_name, tag_line, platform)   
        VALUES ($1,$2,$3,$4)
        ON CONFLICT DO NOTHING
    `;
    
    await client.query(statement, params);
}

export async function insertMatch(client: Client, match: Match){
    const params = [
        match.match_id,
        match.queue_id,
        match.match_duration,
        match.match_date,
        match.game_version
    ];
    const statement = `
        INSERT INTO match(match_id, queue_id, match_duration, match_date, game_version)
        VALUES ($1,$2,$3,$4,$5)
        ON CONFLICT DO NOTHING
    `;

    await client.query(statement, params);
}

export async function insertParticipant(client: Client, participant: Participant){
    const params = [
        participant.puuid,
        participant.match_id,
        participant.kills,
        participant.deaths,
        participant.assists,
        participant.role,
        participant.creep_score,
        participant.damage_dealt,
        participant.gold,
        participant.champion_level,
        participant.vision_score,
        participant.team,
        participant.win,
        participant.champion_key
    ];

    const statement = `
        INSERT INTO participant(puuid, match_id, kills, deaths, assists, role, creep_score, damage_dealt, gold, champion_level, vision_score, team, win, champion_key)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        ON CONFLICT DO NOTHING
    `;

    await client.query(statement, params);
}

export async function insertParticipantRune(client: Client, participantRune: ParticipantRune){
    const params = [
        participantRune.puuid,
        participantRune.match_id,
        participantRune.slot_type,
        participantRune.rune_id
    ];


    const statement = `
        INSERT INTO participantrune(puuid, match_id, slot_type, rune_id)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT DO NOTHING
    `;

    await client.query(statement, params);
}

export async function insertParticipantItem(client: Client, participantItem: ParticipantItem){
    const params = [
        participantItem.puuid,
        participantItem.match_id,
        participantItem.item_id
    ];

    const statement = `
        INSERT INTO participantitem(puuid, match_id, item_id)
        VALUES ($1, $2, $3)
        ON CONFLICT DO NOTHING
    `;

    await client.query(statement, params);
}

export async function insertParticipantSpell(client: Client , participantSpell: ParticipantSpell){
    const params = [
        participantSpell.puuid,
        participantSpell.match_id,
        participantSpell.spell_id
    ];

    const statement = `
        INSERT INTO participantspell(puuid, match_id, spell_id)
        VALUES ($1, $2, $3)
        ON CONFLICT DO NOTHING
    `;

    await client.query(statement, params);
}
export async function insertChampionBan(client: Client, championBan: ChampionBan){
    const params = [
        championBan.match_id,
        championBan.champion_key,
        championBan.team
    ];
    const statement = `
        INSERT INTO ban(match_id, champion_key, team) 
        VALUES ($1, $2, $3)
        ON CONFLICT DO NOTHING
    `;

    await client.query(statement, params);
}

export async function insertRankSnapshot(client: Client, rankSnapshot: RankSnapshot){
    const params = [
        rankSnapshot.puuid,
        rankSnapshot.tier,
        rankSnapshot.division,
        rankSnapshot.league_points,
        rankSnapshot.snapshot_date
    ];

    const statement = `
        INSERT INTO ranksnapshot(puuid, tier, division, league_points, snapshot_date)
        VALUES ($1, $2, $3, $4, $5)
    `;

    await client.query(statement, params);
}

//RETRIVE FROM POSTGRES METHODS

export async function getMatch(client: Client, match_id: string): Promise<Match>{
    const statement =  `
        SELECT * FROM match 
        WHERE match_id = $1
    `;
    const result =  await client.query<Match>(statement, [match_id]);
    return result.rows[0];
}

export async function getAccounts(){
    const statement = `
        SELECT * FROM account 
        JOIN 
        WHERE 
    `;
}

