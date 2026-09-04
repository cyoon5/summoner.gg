import { AccountInsert } from "@/app/types/repository";
import { Client } from "pg";

//platform i.e. na1

//this does not need to release client since the transaction owner should do it
export async function insertAccountData(client: Client, account: AccountInsert){

    const params = [
        account.puuid, 
        account.game_name, 
        account.tag_line, 
        account.platform
    ];
    const statement = `INSERT INTO account(puuid, game_name, tag_line, platform)   
                       VALUES ($1,$2,$3,$4)
                       ON CONFLICT DO NOTHING`;
    await client.query(statement, params);
}