import { Account, ChampionBan, Match, Participant, ParticipantItem, ParticipantRune, ParticipantSpell } from "@/app/types/repository";
import { PoolClient } from "pg";
import { insertAccount, insertChampionBan, insertMatch, insertParticipant, insertParticipantItem, insertParticipantRune, insertParticipantSpell } from "./matchRepository";

export async function storeMatchData(
    client: PoolClient,
    accounts: Account[], 
    participants: Participant[], 
    match: Match, 
    bans: ChampionBan[], 
    items: ParticipantItem[],
    runes: ParticipantRune[],
    spells: ParticipantSpell[]
){

    try{
        
        await client.query('BEGIN');

            await insertMatch(client, match);

            for(const account of accounts){
                await insertAccount(client, account);
            }

            for(const participant of participants){
                await insertParticipant(client, participant);
            }

            for(const ban of bans){
                await insertChampionBan(client, ban);
            }

            for(const item of items){
                await insertParticipantItem(client, item);
            }

            for(const rune of runes){
                await insertParticipantRune(client, rune);
            }

            for(const spell of spells){
                await insertParticipantSpell(client, spell);
            }

        await client.query('COMMIT');

    } catch(e){
        await client.query('ROLLBACK');
        console.error("Transaction Error: ", e)
        throw e;
    } finally{
        client.release();
    }
}   