'use client'

import { SummonerRowProp} from "@/app/types/match"
import styles from "./SummonerRow.module.css"
import Image from "next/image"
import Link from "next/link"
import { formatGold } from "@/lib/formatGold"
import formatRank from "@/lib/formatRankPreview"
import { getChampionIconUrl, getItemIconUrl, getRuneIconUrl, getSummonerSpellIconUrl } from "@/app/services/dragonService"


export default function SummonerRow(props: SummonerRowProp){

    const damageWidth = (props.participant.damageDealt / props.maxDamage) * 100;
    const championUrl = getChampionIconUrl(props.participant.championName);
    const spell1Url = getSummonerSpellIconUrl(props.participant.summonerSpell1Id);
    const spell2Url = getSummonerSpellIconUrl(props.participant.summonerSpell2Id);
    const keyStoneUrl = getRuneIconUrl(props.participant.primaryRuneSelections[0]);
    const secondaryTreeUrl = getRuneIconUrl(props.participant.secondaryRuneTree);
    const kda = props.participant.deaths === 0 ? "Perfect" : ((props.participant.kills + props.participant.assists) / props.participant.deaths).toFixed(2) + " KDA";

    return(
        
        <div className = {props.searchedParticipant.puuid === props.participant.puuid? styles.searchedSummonerContainer : ""}>

            <div className = {styles.summonerContainer}>
                
                <div className = {styles.summoner}>

                    <span className = {styles.champLvlContainer}>
                        <span className = {styles.champLvl}>{props.participant.championLevel}</span>
                    </span>
                
                    <Image
                        src = {championUrl}
                        width = {500}
                        height = {500}
                        className = {styles.championIcon}
                        alt = "Champion Icon"
                    />

                    <div className = {styles.spellContainer}>
                        <Image
                            src = {spell1Url}
                            className = {styles.summonerSpell}
                            width={500}
                            height={500}
                            alt= "Spell Image"
                        />
                        <Image
                            src = {spell2Url}
                            className = {styles.summonerSpell}
                            width={500}
                            height={500}
                            alt= "Spell Image"
                        />
                    </div>

                    <div className = {styles.runeContainer}>

                        {
                           keyStoneUrl && <div className = {styles.runeSlot}>
                                <Image
                                    src = {keyStoneUrl}
                                    className = {styles.rune}
                                    width={500}
                                    height={500}
                                    alt= "Rune Image"
                                />
                            </div>
                        }
                        
                        {                                    
                            secondaryTreeUrl && <div className = {styles.runeSlot}>
                                <Image
                                    src = {secondaryTreeUrl}
                                    className = {styles.secondaryRuneTree}
                                    width={500}
                                    height={500}
                                    alt= "Rune Image"
                                />

                            </div>
                        }
            
                    </div>

                    <div className = {styles.nameAndRank}>

                        <Link  
                            title = {props.participant.gameName + "#" + props.participant.tagLine} 
                            href = {`/profile/${props.platform}/${props.participant.gameName}/${props.participant.tagLine}`} 
                            className = {props.participant.puuid === props.searchedParticipant.puuid ? styles.searchedParticipant : styles.participant}>{props.participant.gameName}
                        </Link>

                        <div className = {styles.rank}>
                            
                            <Image
                                src = {`/mini-emblems/${props.rank? props.rank.tier.toLowerCase() : "unranked"}.svg`}
                                className = {styles.miniRankedEmblem}
                                width={500}
                                height={500}
                                alt= "Rank Mini Crest"
                            />

                            <span>{props.rank ? `${formatRank(props.rank.tier, props.rank.division, props.rank.leaguePoints)}` : '-'}</span>

                        </div>

                    </div>


                </div>

                <div className = {styles.kda}>
                    <span className = {styles.kdaTotal}> {props.participant.kills}/{props.participant.deaths}/{props.participant.assists} </span>
                    <span> {kda + ""} </span>
                </div>

                <div className = {styles.damage}>
                    <span>{props.participant.damageDealt.toLocaleString()}</span>

                    <div className = {styles.damageBarContainer}>
                        <div className = {styles.damageBar} style={{ width: `${damageWidth}%` }}></div>
                    </div>
                </div>

                <div className = {styles.gold}>
                    {formatGold(props.participant.totalGoldEarned)}
                </div>

                <div className = {styles.creepScore}> 
                    {props.participant.creepScore}
                </div>  
            
                <div className = {styles.wards}>
                    {props.participant.visionScore}
                </div>

                <div className = {styles.itemContainer}>
                    {
                        props.participant.items.map((itemId, i) => {
                            const itemUrl = getItemIconUrl(itemId);
                            
                            return (
                                <div className = {styles.itemSlot} key = {i}>

                                    {
                                        itemUrl && <Image
                                        className = {styles.item}
                                        src = {itemUrl}
                                        width={500}
                                        height={500}
                                        alt= "Item Image"
                                        />
                                    }

                                </div>
                            )
            
                        })
                    }
                </div>
            
            </div>
        </div>  
    )
}