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

export async function getBestChampionRunes(){
    const statement = `
        SELECT 
    `;

}