import { Account, ChampionBan, Match, Participant, ParticipantItem, ParticipantRune, ParticipantSpell } from "../types/repository";
import { MatchDto, ParticipantDto } from "../types/riotMatch";

export function getAccounts(rawMatchData: MatchDto): Account[]{
    return rawMatchData.info.participants.map((p:ParticipantDto): Account => ({
            puuid: p.puuid,
            game_name: p.riotIdGameName,
            tag_line: p.riotIdTagline,
            platform: rawMatchData.info.platformId,
        })
    );
}

export function getParticipants(rawMatchData: MatchDto): Participant[]{
    return rawMatchData.info.participants.map((p:ParticipantDto): Participant => ({
            puuid: p.puuid,
            match_id: rawMatchData.metadata.matchId,
            kills: p.kills,
            deaths: p.deaths,
            assists: p.assists,
            role: p.teamPosition,
            creep_score:  p.neutralMinionsKilled + p.totalMinionsKilled,
            damage_dealt: p.totalDamageDealtToChampions,
            gold: p.goldEarned,
            champion_level: p.champLevel,
            vision_score: p.visionScore,
            team: p.teamId === 100? 'blue' : 'red',
            win: p.win,
            champion_key: p.championId
        })
    );
}

export function getMatch(rawMatchData: MatchDto): Match{
    return{
        match_id: rawMatchData.metadata.matchId,
        queue_id: rawMatchData.info.queueId,
        match_duration: rawMatchData.info.gameDuration,
        match_date: new Date(rawMatchData.info.gameEndTimestamp),
        game_version: rawMatchData.info.gameVersion
    }
}

export function getBans(rawMatchData: MatchDto): ChampionBan[]{
    return rawMatchData.info.teams.flatMap((team) =>
        team.bans.filter(ban => ban.championId !== -1).map((ban): ChampionBan => ({
                match_id: rawMatchData.metadata.matchId,
                champion_key: ban.championId,
                team: team.teamId === 100? 'blue' : 'red'
            })
        )
    );
}

//~70 items/match
export function getParticipantItems(rawMatchData: MatchDto): ParticipantItem[]{ 
    const items: ParticipantItem[] = [];
    const ignoredItems = new Set([
        0, 1090, 1091,
        1092, 1093, 1094,
        1200, 1201, 1202,
        1203, 1204, 1205,
        1206, 1207, 1208,
        1209, 1210, 1211,
        1220, 1221, 1222
    ]);

    for(const participant of rawMatchData.info.participants){
        const participantItems = [
            participant.item0,
            participant.item1,
            participant.item2,
            participant.item3,
            participant.item4,
            participant.item5,
            participant.item6,
            participant.roleBoundItem
        ];

        for(const [index, itemId] of participantItems.entries()){

            if(ignoredItems.has(itemId))
                continue;
            
            items.push({
                puuid: participant.puuid,
                match_id: rawMatchData.metadata.matchId,
                item_id: itemId,
                slot: index
            });
        }
    }
    return items;
}

export default function getParticipantRunes(rawMatchData: MatchDto): ParticipantRune[]{
    const runes: ParticipantRune[] = [];

    if(rawMatchData.info.participants[0]?.perks?.styles === undefined) {
        return [];
    }
    const primaryTreeSlots = new Map<number, string>([
        [0, "PRIMARY_SLOT_1"],
        [1, "PRIMARY_SLOT_2"],
        [2, "PRIMARY_SLOT_3"],
        [3, "PRIMARY_SLOT_4"],
    ]);

    const secondaryTreeSlots = new Map<number, string>([
        [0, "SECONDARY_SLOT_1"],
        [1, "SECONDARY_SLOT_2"],
    ]);

    const statPerkSlots = new Map<string, string>([
        ["offense", "OFFENSE"],
        ["flex", "FLEX"],
        ["defense", "DEFENSE"],
    ]);
    
    for(const participant of rawMatchData.info.participants){
        participant.perks.styles.forEach(style =>
            style.selections.forEach((selection, index) => {
                    if(style.description === "primaryStyle"){
                        runes.push({
                            puuid: participant.puuid,
                            match_id: rawMatchData.metadata.matchId,
                            slot_type: primaryTreeSlots.get(index)!,
                            rune_id: selection.perk
                        });
                    }
                    else{
                        runes.push({
                            puuid: participant.puuid,
                            match_id: rawMatchData.metadata.matchId,
                            slot_type: secondaryTreeSlots.get(index)!,
                            rune_id: selection.perk
                        });
                    } 
                }
            )
        );

        Object.entries(participant.perks.statPerks).forEach(([key, value]) =>{
                    runes.push({
                        puuid: participant.puuid,
                        match_id: rawMatchData.metadata.matchId,
                        slot_type: statPerkSlots.get(key)!,
                        rune_id: value
                    });
            }
        )   
    }
    return runes;
}

export function getParticipantSpells(rawMatchData: MatchDto): ParticipantSpell[]{
    const spells: ParticipantSpell[] = [];

    for(const participant of rawMatchData.info.participants){
        if(participant.summoner1Id !== 0){
            spells.push({
                    puuid: participant.puuid,
                    match_id: rawMatchData.metadata.matchId,
                    spell_id: participant.summoner1Id,
                    slot: 0
            });
        }

        if(participant.summoner2Id !== 0){
            spells.push({
                    puuid: participant.puuid,
                    match_id: rawMatchData.metadata.matchId,
                    spell_id: participant.summoner2Id,
                    slot: 1
            });
        }
    }
    return spells;
}