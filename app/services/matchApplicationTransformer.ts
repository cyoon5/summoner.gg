import { QUEUE_MAP } from "../constants";
import { MatchInfo, ParticipantInfo } from "../types/match";
import { Account, Match, Participant, ParticipantItem, ParticipantRune, ParticipantSpell } from "../types/repository";
import { MatchDto } from "../types/riotMatch";
import { getRuneTreeMap } from "./dragonService";

const runeTreeMap = await getRuneTreeMap();

export function getMatchParticipantsInfo(rawMatchData: MatchDto[]): ParticipantInfo[][]{

    const participantArray: ParticipantInfo[][] = [];
    for(let i = 0; i < rawMatchData.length; i++){

        let currentMatch = rawMatchData[i];
        const participantListRiot = currentMatch.info.participants;
        
        const participantInfoList = participantListRiot.map((p): ParticipantInfo => ({
            matchId: currentMatch.metadata.matchId,
            puuid: p.puuid,
            gameName: p.riotIdGameName,
            tagLine: p.riotIdTagline,
            platform: currentMatch.info.platformId,

            role: p.teamPosition,
            championKey: p.championId,
            creepScore: p.neutralMinionsKilled + p.totalMinionsKilled,
            damageDealt: p.totalDamageDealtToChampions,
            summonerSpell1Id: p.summoner1Id,
            summonerSpell2Id: p.summoner2Id,
            
            primaryRuneTree: p.perks.styles[0].style,
            primaryRuneSelections: p.perks.styles[0].selections.map((r)=> r.perk),
            secondaryRuneTree: p.perks.styles[1].style,
            secondaryRuneSelections: p.perks.styles[1].selections.map((r)=> r.perk),
            statPerks: p.perks.statPerks,
            
            kills: p.kills,
            deaths: p.deaths,
            assists: p.assists,
            championLevel: p.champLevel,
            totalGoldEarned: p.goldEarned,
            items: [
                p.item0,
                p.item1,
                p.item2, 
                p.item6, //Trinket
                p.item3,   
                p.item4,
                p.item5,
                p.roleBoundItem
            ],
            visionScore: p.visionScore,
            team: p.teamId == 100? 'blue' : 'red',
            win: p.win
        }));

        participantArray.push(participantInfoList);
    }
    return participantArray;
}

export function getMatchInfo(rawMatchData: MatchDto): MatchInfo {
    const matchInfo: MatchInfo = {
        gameMode: QUEUE_MAP.get(rawMatchData.info.queueId),
        gameDuration: rawMatchData.info.gameDuration,
        date: rawMatchData.info.gameEndTimestamp,
        matchId: rawMatchData.metadata.matchId
    }
    return matchInfo;
}

export function getApplicationMatchInfo(match: Match): MatchInfo{
    return {
        gameMode: QUEUE_MAP.get(match.queue_id),
        gameDuration: match.match_duration,
        date: Math.floor(new Date(match.match_date).getTime() / 1000),
        matchId: match.match_id
    }
}


export function getApplicationParticipantInfo(
    accounts: Account[], 
    participants: Participant[],
    participantRunes: ParticipantRune[],
    participantItems: ParticipantItem[],
    participantSpells: ParticipantSpell[]
): ParticipantInfo[]{

    const participantList: ParticipantInfo[] = [];

    for(const account of accounts){
        const currentParticipant = participants.find(p => p.puuid === account.puuid)!;
        const currentParticipantSpells = participantSpells.filter(s => s.puuid == account.puuid);
        const currentParticipantRunes = participantRunes.filter(r => r.puuid == account.puuid);
        const currentParticipantItems = participantItems.filter(i => i.puuid == account.puuid);

        let participant: ParticipantInfo={
            matchId: currentParticipant.match_id,
            puuid: account.puuid,
            gameName: account.game_name,
            tagLine: account.tag_line,
            platform: account.platform,
            role: currentParticipant.role,
            championKey: currentParticipant.champion_key,
            creepScore: currentParticipant.creep_score,
            damageDealt: currentParticipant.damage_dealt,
            summonerSpell1Id: currentParticipantSpells.find(s => s.slot == 0)?.spell_id,
            summonerSpell2Id: currentParticipantSpells.find(s => s.slot == 1)?.spell_id,

            primaryRuneTree: runeTreeMap.get(currentParticipantRunes.find(s => s.slot_type === 'PRIMARY_SLOT_1')?.rune_id!),
            primaryRuneSelections: [ 
                currentParticipantRunes.find(r => r.slot_type === 'PRIMARY_SLOT_1')?.rune_id!,
                currentParticipantRunes.find(r => r.slot_type === 'PRIMARY_SLOT_2')?.rune_id!,
                currentParticipantRunes.find(r => r.slot_type === 'PRIMARY_SLOT_3')?.rune_id!,
                currentParticipantRunes.find(r => r.slot_type === 'PRIMARY_SLOT_4')?.rune_id!,
            ],
            secondaryRuneTree: runeTreeMap.get(currentParticipantRunes.find(s => s.slot_type === 'SECONDARY_SLOT_1')?.rune_id!),
            secondaryRuneSelections: [
                currentParticipantRunes.find(r => r.slot_type === 'SECONDARY_SLOT_1')?.rune_id!,
                currentParticipantRunes.find(r => r.slot_type === 'SECONDARY_SLOT_2')?.rune_id!,
            ],
            statPerks: {
                offense: currentParticipantRunes.find(r => r.slot_type === 'OFFENSE')?.rune_id!,
                flex: currentParticipantRunes.find(r => r.slot_type === 'FLEX')?.rune_id!,
                defense: currentParticipantRunes.find(r => r.slot_type === 'DEFENSE')?.rune_id!
            },
            kills: currentParticipant.kills,
            deaths: currentParticipant.deaths,
            assists: currentParticipant.assists,
            championLevel: currentParticipant.champion_level,
            totalGoldEarned: currentParticipant.gold,
            items: currentParticipantItems.sort((a,b) => a.slot - b.slot).map(i => i.item_id),
            visionScore: currentParticipant.vision_score,
            team: currentParticipant.team,
            win: currentParticipant.win
        }

        participantList.push(participant);
    }


    return participantList;
}