'use client'

import { SummonerRowProp} from "@/app/types/match"
import styles from "./SummonerRow.module.css"
import Image from "next/image"
import Link from "next/link"
import { formatGold } from "@/lib/formatGold"
import { useEffect, useState} from "react"
import { RankedDataMini } from "@/app/types/ranked"
import formatRank from "@/lib/formatRankPreview"


export default function SummonerRow(prop: SummonerRowProp){

    const damageWidth = (prop.participant.damageDealt / prop.maxDamage) * 100;
    const [summonerRank, setSummonerRank] = useState<RankedDataMini | undefined>(undefined);



    useEffect(() => { //Currently, collapsing and re-expanding will re-fetch

        const fetchRankPreview = async() =>{
            const res = await fetch(`/api/ranked/?puuid=${prop.participant.puuid}&platform=${prop.platform}`);
            const data =  await res.json();
            setSummonerRank(data.rankInfoPreview);
        }

        fetchRankPreview();
    }, [])



    return(
        
        <div className = {prop.searchedParticipant.puuid == prop.participant.puuid? styles.searchedSummonerContainer : ""}>

            <div className = {styles.summonerContainer}>
                
                <div className = {styles.summoner}>

                    <span className = {styles.champLvlContainer}>
                        <span className = {styles.champLvl}>{prop.participant.championLevel}</span>
                    </span>
                
                    <Image
                        src = {prop.participant.championUrl}
                        width = {500}
                        height = {500}
                        className = {styles.championIcon}
                        alt = "Champion Icon"
                    />

                    <div className = {styles.spellContainer}>
                        <Image
                            src = {prop.participant.summonerSpell1Url}
                            className = {styles.summonerSpell}
                            width={500}
                            height={500}
                            alt= "Spell Image"
                        />
                        <Image
                            src = {prop.participant.summonerSpell2Url}
                            className = {styles.summonerSpell}
                            width={500}
                            height={500}
                            alt= "Spell Image"
                        />
                    </div>

                    <div className = {styles.runeContainer}>

                        {
                           prop.participant.keystoneUrl && <div className = {styles.runeSlot}>
                                <Image
                                    src = {prop.participant.keystoneUrl}
                                    className = {styles.rune}
                                    width={500}
                                    height={500}
                                    alt= "Rune Image"
                                />
                            </div>
                        }
                        
                        {                                    
                            prop.participant.secondaryRuneTreeUrl && <div className = {styles.runeSlot}>
                                <Image
                                    src = {prop.participant.secondaryRuneTreeUrl}
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
                            title = {prop.participant.gameName + "#" + prop.participant.tagLine} 
                            href = {`/profile/na1/${prop.participant.gameName}/${prop.participant.tagLine}`} 
                            className = {prop.participant.puuid == prop.searchedParticipant.puuid ? styles.searchedParticipant : styles.participant}>{prop.participant.gameName}
                        </Link>

                        <div className = {styles.rank}>
                            <Image
                                src = {`/mini-emblems/${summonerRank? summonerRank.tier.toLowerCase() : "unranked"}.svg`}
                                className = {styles.miniRankedEmblem}
                                width={500}
                                height={500}
                                alt= "Rank Mini Crest"
                            />

                            <span>{summonerRank ? `${formatRank(summonerRank.tier, summonerRank.division, summonerRank.leaguePoints)}` : '-'}</span>

                        </div>

                    </div>


                </div>

                <div className = {styles.kda}>
                    <span className = {styles.kdaTotal}> {prop.participant.kills}/{prop.participant.deaths}/{prop.participant.assists} </span>
                    <span> {prop.participant.kda + ""} </span>
                </div>

                <div className = {styles.damage}>
                    <span>{prop.participant.damageDealt.toLocaleString()}</span>

                    <div className = {styles.damageBarContainer}>
                        <div className = {styles.damageBar} style={{ width: `${damageWidth}%` }}></div>
                    </div>
                </div>

                <div className = {styles.gold}>
                    {formatGold(prop.participant.totalGoldEarned)}
                </div>

                <div className = {styles.creepScore}> 
                    {prop.participant.creepScore}
                </div>  
            
                <div className = {styles.wards}>
                    {prop.participant.visionScore}
                </div>

                <div className = {styles.itemContainer}>
                    {
                        prop.participant.itemUrls.map((item:string, i) => (
                            
                            <div className = {styles.itemSlot} key = {i}>

                                {
                                    item && <Image
                                    className = {styles.item}
                                    src = {item}
                                    width={500}
                                    height={500}
                                    alt= "Item Image"
                                    />
                                }

                            </div>

                        ))
                    }
                </div>
            
            </div>
        </div>  
    )
}