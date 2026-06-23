'use client'

import Image from 'next/image'
import styles from "./MatchCard.module.css"
import { MatchCardProp, ParticipantInfo } from '@/app/types/match'
import { getChampionIconUrl, getItemIconUrl } from '@/app/services/dragonService'
import Link from 'next/link'


export default function MatchCard(props: MatchCardProp){


    return(
        <>
                <div className = {styles.contentBox}>

                        <div className = {styles.box1}> 
                            <b className = {styles.box1Text}> {props.matchInfo.gameMode} </b>
                            <p > {props.matchInfo.date} </p>
                            <p className = {`${props.participant.win ? styles.gameWin : styles.gameLoss}`}>{props.participant.win? 'WIN: ' + props.matchInfo.gameDuration : 'LOSS: ' + props.matchInfo.gameDuration}</p>
                        </div>

                        <div className = {styles.box2}>
                            
                            <div className = {styles.champion}>
                                <Image
                                    src = {props.participant.championUrl}
                                    className={styles.championIcon}
                                    width={500}
                                    height={500}
                                    alt= "Champ Icon"
                                    loading= "eager"
                                />
                            </div>

                            <div className = {styles.summonerBox}>
                                <Image
                                    src = {props.participant.summonerSpell1Url}
                                    className = {styles.summonerSpell}
                                    width={500}
                                    height={500}
                                    alt= "Spell Image"
                                    loading= "eager"
                                />
                                <Image
                                    src = {props.participant.summonerSpell2Url}
                                    className = {styles.summonerSpell}
                                    width={500}
                                    height={500}
                                    alt= "Spell Image"
                                    loading= "eager"
                                />
                            </div>

                            <div className  = {styles.runeBox}>
                                <Image
                                    src = {props.participant.keystoneUrl}
                                    className = {styles.rune}
                                    width={500}
                                    height={500}
                                    alt= "Rune Image"
                                    loading= "eager"
                                />
                                <Image
                                    src = {props.participant.secondaryRuneTreeUrl}
                                    className = {styles.secondaryRuneTree}
                                    width={500}
                                    height={500}
                                    alt= "Rune Image"
                                    loading= "eager"
                                />
                            </div>
                            
                        </div>

                        <div className = {styles.box3}> 
                            <p className = {styles.kdaTotal}> {props.participant.kills}/{props.participant.deaths}/{props.participant.assists} </p>
                            <p className = {styles.kdaRatio}>{props.participant.kda} KDA</p>
                            <p className = {styles.cs}>{props.participant.creepScore} CS</p>
                            <p className = {styles.vision}>{props.participant.visionScore} Vision</p>
                        </div>

                        <div className = {styles.box4}> 
                                {
                                    props.participant.itemUrls.map((p,i) => (
                                        p && <Image
                                            key = {i}
                                            className = {styles.item}
                                            src = {p}
                                            width={500}
                                            height={500}
                                            alt= "Item Image"
                                            loading= "eager"
                                        />
                                    ))
                                }
                        </div>

                        <div className = {styles.box5}>

                            <div className = {styles.teamList1}>


                                    {
                                        props.participants.filter(p => p.team == 'blue').map((p) => (  
                                            
                                            <div className = {styles.summonerEntry} key = {p.puuid}>
                                                    <Image 
                                                        width = "500"
                                                        height = "500"
                                                        alt = "champIcon"
                                                        className = {styles.champIconMini} 
                                                        src = {p.championUrl}
                                                        loading = "eager"
                                                    />
                                                    <div className = {styles.summonerName} title = {p.gameName + "#" + p.tagLine}>
                                                        <Link href = {`/profile/na1/${p.gameName}/${p.tagLine}`} className = {styles.summonerName}>{p.gameName}</Link>
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
                                                        src = {p.championUrl}
                                                        loading = "eager"
                                                    />
                                                    <div className = {styles.summonerName} title = {p.gameName + "#" + p.tagLine}>
                                                        <Link href = {`/profile/na1/${p.gameName}/${p.tagLine}`} className = {styles.summonerName}>{p.gameName}</Link>

                                                        {/*TODO: DYNAMIC REGION ROUTE, PROB CHANGE ParticipantInfo type to carry region*/}
                                                    </div>
                                            </div>

                                        ))
                                    }
                

                            </div>
                        </div>

       

    
               
                </div>
        </>
    )
}