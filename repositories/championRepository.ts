import { HighestWinRateRunes, HighestWinRateStatShards } from "@/app/types/champion";
import { Client } from "pg";



//TODO: Add error check if no rows returned

export async function getChampionKey(client: Client, champion_name: string):Promise<number | null>{
    const statement = `
        SELECT champion_key 
        FROM champion
        WHERE champion_name = $1;
    `;
    const result = await client.query(statement, [champion_name]);

    if(result.rows.length === 0 )
        return null;

    return result.rows[0].champion_key;
}

export async function getChampionMatchesPlayed(client: Client, champion_key: number): Promise<number>{
    const statement = `
        SELECT COUNT(*) 
        AS matches_played
        FROM participant 
        JOIN match
        ON participant.match_id = match.match_id
        WHERE champion_key = $1 
        AND queue_id IN (400, 420);
    `;
    const result = await client.query(statement, [champion_key]);
    return Number(result.rows[0].matches_played);
}

export async function getChampionPickRate(client: Client, champion_key: number): Promise<number>{
    const statement = `
        SELECT ROUND(COUNT(*) FILTER(WHERE champion_key = $1) * 100.0 / COUNT(DISTINCT match_id), 2) 
        AS pick_rate 
        FROM participant;
    `;
    const result = await client.query(statement, [champion_key]);
    return Number(result.rows[0].pick_rate);
}

export async function getChampionWinRate(client: Client, champion_key: number): Promise<number>{
    const statement = `
        SELECT ROUND(COUNT(*) FILTER(WHERE champion_key = $1 AND win = TRUE) * 100.0 / COUNT(*) FILTER(WHERE champion_key = $1), 2)
        AS win_rate
        FROM participant;
    `;
    const result = await client.query(statement, [champion_key]);
    return Number(result.rows[0].win_rate);
}

export async function getChampionBanRate(client: Client, champion_key: number): Promise<number>{
    const statement = `
        SELECT ROUND(COUNT(DISTINCT match_id) FILTER(WHERE champion_key = $1) * 100.0 / COUNT(DISTINCT match_id), 2)
        AS ban_rate
        FROM ban; 
    `;
    const result = await client.query(statement, [champion_key]);
    return Number(result.rows[0].ban_rate);
}

export async function getHighestWrChampionRunes(client: Client, champion_key: number): Promise<HighestWinRateRunes>{
    const statement = `
        WITH rune_pages AS (
            SELECT 
                participant.puuid, 
                participant.match_id, 
                MAX(CASE WHEN slot_type = 'PRIMARY_SLOT_1' THEN rune_id END) AS PRIMARY_SLOT_1,
                MAX(CASE WHEN slot_type = 'PRIMARY_SLOT_2' THEN rune_id END) AS PRIMARY_SLOT_2,
                MAX(CASE WHEN slot_type = 'PRIMARY_SLOT_3' THEN rune_id END) AS PRIMARY_SLOT_3,
                MAX(CASE WHEN slot_type = 'PRIMARY_SLOT_4' THEN rune_id END) AS PRIMARY_SLOT_4,
                MAX(CASE WHEN slot_type = 'SECONDARY_SLOT_1' THEN rune_id END) AS SECONDARY_SLOT_1,
                MAX(CASE WHEN slot_type = 'SECONDARY_SLOT_2' THEN rune_id END) AS SECONDARY_SLOT_2
            FROM 
                participant JOIN participantrune 
                ON participant.puuid = participantrune.puuid 
                AND participant.match_id = participantrune.match_id
            WHERE 
                champion_key = $1
            GROUP BY 
                participant.puuid, 
                participant.match_id
        )
                
        SELECT 
            PRIMARY_SLOT_1,
            PRIMARY_SLOT_2,
            PRIMARY_SLOT_3,
            PRIMARY_SLOT_4,
            SECONDARY_SLOT_1,
            SECONDARY_SLOT_2,
            ROUND(COUNT(*) FILTER(WHERE win = TRUE) * 100.0 / COUNT(*), 2) AS win_rate,
            COUNT(*) AS matches_used
        FROM rune_pages 
        JOIN participant
        ON participant.puuid = rune_pages.puuid
        AND participant.match_id = rune_pages.match_id
        GROUP BY
            PRIMARY_SLOT_1,
            PRIMARY_SLOT_2,
            PRIMARY_SLOT_3,
            PRIMARY_SLOT_4,
            SECONDARY_SLOT_1,
            SECONDARY_SLOT_2
        HAVING COUNT(*) >= 1
        ORDER BY win_rate DESC;
    `;
    const result = await client.query(statement, [champion_key]);
    return result.rows[0];

    //TODO: handle low sample bias
}

export async function getHighestWrChampionStatShards(client: Client, champion_key: number): Promise<HighestWinRateStatShards>{
    const statement = `
        WITH rune_pages AS (
            SELECT 
                participant.puuid, 
                participant.match_id, 
                MAX(CASE WHEN slot_type = 'DEFENSE' THEN rune_id END) AS DEFENSE,
                MAX(CASE WHEN slot_type = 'FLEX' THEN rune_id END) AS FLEX,
                MAX(CASE WHEN slot_type = 'OFFENSE' THEN rune_id END) AS OFFENSE
            FROM 
                participant JOIN participantrune 
                ON participant.puuid = participantrune.puuid 
                AND participant.match_id = participantrune.match_id
            WHERE 
                champion_key = $1
            GROUP BY 
                participant.puuid, 
                participant.match_id
        )
                
        SELECT 
            DEFENSE,
            FLEX,
            OFFENSE,
            ROUND(COUNT(*) FILTER(WHERE win = TRUE) * 100.0 / COUNT(*), 2) AS win_rate,
            COUNT(*) AS matches_used
        FROM 
            rune_pages JOIN participant
            ON participant.puuid = rune_pages.puuid
            AND participant.match_id = rune_pages.match_id
        GROUP BY
            DEFENSE,
            FLEX,
            OFFENSE
        HAVING COUNT(*) >= 2
        ORDER BY win_rate DESC;
    `;

    const result = await client.query(statement, [champion_key]);
    return result.rows[0];
}
