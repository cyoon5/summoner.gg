import { getChampionBanRate, getChampionKey, getChampionMatchesPlayed, getChampionPickRate, getChampionWinRate, getRecommendedRunes, getHighestWrChampionStatShards } from "@/repositories/championRepository";
import { ChampionData } from "../types/champion";
import { getClient } from "@/lib/db";
import { findRuneTree } from "./dragonService";

export async function getChampionAnalytics(champion_name: string): Promise<ChampionData>{
    const client = await getClient();

    try{
        const champion_key = await getChampionKey(client, champion_name);

        if(!champion_key)
            throw new Error(`Champion not found: ${champion_name}`);

        const matches_played = await getChampionMatchesPlayed(client, champion_key);
        const pick_rate = await getChampionPickRate(client, champion_key);
        const win_rate = await getChampionWinRate(client, champion_key);
        const ban_rate = await getChampionBanRate(client, champion_key);
        const highest_wr_runes = await getRecommendedRunes(client, champion_key);
        const highest_wr_stat_shards = await getHighestWrChampionStatShards(client, champion_key);
        const rune_trees = getChampionRuneTrees(highest_wr_runes.primary_slot_1, highest_wr_runes.secondary_slot_1);

        return{
            champion_key,
            matches_played,
            pick_rate,
            win_rate,
            ban_rate,
            highest_wr_runes,
            highest_wr_stat_shards,
            primary_rune_tree: rune_trees[0],
            secondary_rune_tree: rune_trees[1]
        }
    }
    catch(err){
        console.error("Error in finding champion analytics", err);
        throw err;
    }
    finally{
        client.release();
    }
}

export function getChampionRuneTrees(primary_rune_id: number, secondary_rune_id: number) : (number|undefined) []{
    return [findRuneTree(primary_rune_id), findRuneTree(secondary_rune_id)];
}

 
