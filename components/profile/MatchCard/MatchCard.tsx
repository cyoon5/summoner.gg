'use client'

import Image from 'next/image'
import styles from "./MatchCard.module.css"
import { MatchCardProp, ParticipantInfo} from '@/app/types/match'
import { useState } from 'react'
import Link from 'next/link'
import MatchCardDetail from '../MatchCardDetail/MatchCardDetail'
import { getChampionIconUrl, getItemIconUrl, getRuneIconUrl, getSummonerSpellIconUrl } from '@/app/services/dragonService'


export default function MatchCard(props: MatchCardProp){

    const [isDetailsOpen, setDetailsOpen] = useState(false);
    const maxDamage = Math.max(...props.participants.map((p:ParticipantInfo) => p.damageDealt));

    const keyStoneUrl = getRuneIconUrl(props.participant.primaryRuneSelections[0]);
    const secondaryTreeUrl = getRuneIconUrl(props.participant.secondaryRuneTree);


    return(
        
        <div className = {styles.container}>


                <div className = {styles.contentBox} onClick = {() => setDetailsOpen(previous => !previous)}>

                        <div className = {styles.box1}> 
                            <b className = {styles.box1Text}> {props.matchInfo.gameMode} </b>
                            <p > {props.matchInfo.date} </p>
                            <p className = {`${props.participant.win ? styles.gameWin : styles.gameLoss}`}>{props.participant.win? 'WIN ' + props.matchInfo.gameDuration : 'LOSS ' + props.matchInfo.gameDuration}</p>
                        </div>

                        <div className = {styles.box2}>

                            <span className = {styles.champLvlContainer}>
                                <span className = {styles.champLvl}>{props.participant.championLevel}</span>
                            </span>
                            
                            <div className = {styles.champion}>
                                <Image
                                    src = {getChampionIconUrl(props.participant.championName)}
                                    className={styles.championIcon}
                                    width={500}
                                    height={500}
                                    alt= "Champ Icon"
                                    loading= "eager"
                                />
                            </div>

                            <div className = {styles.summonerBox}>
                                <Image
                                    src = {getSummonerSpellIconUrl(props.participant.summonerSpell1Id)}
                                    className = {styles.summonerSpell}
                                    width={500}
                                    height={500}
                                    alt= "Spell Image"
                                    loading= "eager"
                                />
                                <Image
                                    src = {getSummonerSpellIconUrl(props.participant.summonerSpell2Id)}
                                    className = {styles.summonerSpell}
                                    width={500}
                                    height={500}
                                    alt= "Spell Image"
                                    loading= "eager"
                                />
                            </div>

                            <div className  = {styles.runeBox}>
                                {
                                   keyStoneUrl && (<div className = {styles.runeSlot}>
                                            {
                                                <Image
                                                    src = {keyStoneUrl}
                                                    className = {styles.rune}
                                                    width={500}
                                                    height={500}
                                                    alt= "Rune Image"
                                                    loading= "eager"
                                                />
                                            }                                   
                                        </div>)
                                }
                                {
                                        secondaryTreeUrl && (<div className = {styles.runeSlot}>
                                        <Image
                                            src = {secondaryTreeUrl}
                                            className = {styles.secondaryRuneTree}
                                            width={500}
                                            height={500}
                                            alt= "Rune Image"
                                            loading= "eager"
                                        />
                                    </div>)
                                }
                            </div>
                            
                        </div>

                        <div className = {styles.box3}> 
                            <p className = {styles.kdaTotal}> {props.participant.kills}/{props.participant.deaths}/{props.participant.assists} </p>
                            <p className = {styles.kdaRatio}>{props.participant.deaths == 0? "Perfect" :((props.participant.kills + props.participant.assists)/(props.participant.deaths || 1)).toFixed(2) + " KDA"} </p>
                            <p className = {styles.cs}>{props.participant.creepScore} CS</p>
                            <p className = {styles.vision}>{props.participant.visionScore} Vision</p>
                        </div>

                        <div className = {styles.box4}> 
                            {
                                props.participant.items.map((itemId,i) => {
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
                                                loading= "eager"
                                                />
                                            }
                                        </div>
                                    )})
                            }
                        </div>

                        <div className = {styles.box5}>

                            <div className = {styles.teamList1}>


                                    {
                                        props.participants.filter(p => p.team == 'blue').map((p) => (  
                                            
                                            //TODO: puuid, is not unique across Co-op vs AI
                                            <div className = {styles.summonerEntry} key = {p.puuid}>

                                                    <Image 
                                                        width = "500"
                                                        height = "500"
                                                        alt = "champIcon"
                                                        className = {styles.champIconMini} 
                                                        src = {getChampionIconUrl(p.championName)}
                                                        loading = "eager"
                                                    />

                                                    <div className = {styles.summonerName} title = {p.gameName + "#" + p.tagLine} onClick = {e => e.stopPropagation()}>
                                                        <Link 
                                                            href = {`/profile/${props.platform}/${p.gameName}/${p.tagLine}`} 
                                                            className = {`${p.puuid == props.participant.puuid? styles.searchedSummonerName : styles.summonerName}`}>
                                                                {p.gameName}
                                                        </Link>
                                                    </div>

                                            </div>


                                        ))
                                    }
                

                            </div>

                            <div className = {styles.teamList2}>

                                    {
                                        props.participants.filter(p => p.team == 'red').map((p) => (  

                                            <div className = {styles.summonerEntry} key = {p.puuid}>

                                                    <Image 
                                                        width = "500"
                                                        height = "500"
                                                        alt = "champIcon"
                                                        className = {styles.champIconMini} 
                                                        src = {getChampionIconUrl(p.championName)}
                                                        loading = "eager"
                                                    />

                                                    <div className = {styles.summonerName} title = {p.gameName + "#" + p.tagLine} onClick = {e => e.stopPropagation()}>
                                                        <Link 
                                                            href = {`/profile/${props.platform}/${p.gameName}/${p.tagLine}`} 
                                                            className = {`${p.puuid == props.participant.puuid? styles.searchedSummonerName : styles.summonerName}`}>
                                                                {p.gameName}
                                                        </Link>

                                                    </div>

                                            </div>

                                        ))
                                    }
                

                            </div>
                        </div>

                        <div className = {styles.dropdownArrow}>
                            {isDetailsOpen? "˄" : "˅"}
                        </div>

       

    
               
                </div>

                {isDetailsOpen && <MatchCardDetail participants = {props.participants} participant = {props.participant} maxDamage = {maxDamage} platform = {props.platform}/> }

        </div>
    )
}