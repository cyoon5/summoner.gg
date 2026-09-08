import { QUEUE_MAP } from "../constants";
import { MatchInfo, ParticipantInfo } from "../types/match";
import { MatchDto } from "../types/riotMatch";

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
            gameVersion: currentMatch.info.gameVersion,

            role: p.teamPosition,
            championName: p.championName,
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