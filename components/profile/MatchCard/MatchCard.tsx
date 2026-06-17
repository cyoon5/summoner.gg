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
                            <p > {props.matchInfo.gameDuration} </p>
                            <p className = {styles.gameLoss}>{props.participant.win? 'WIN' : 'LOSS'}</p>
                        </div>

                        <div className = {styles.box2}>
                            <div className = {styles.champion}>
                                <img src = {props.participant.championUrl} className={styles.championIcon}></img>
                            </div>

                            <div className = {styles.summonerBox}>
                                <img className = {styles.summonerSpell} src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                <img className = {styles.summonerSpell} src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                            </div>

                            <div className  = {styles.runeBox}>
                                <img className = {styles.rune} src = "https://pbs.twimg.com/media/Ggt9Pf4XkAAmPNw.jpg"></img>
                                <img className = {styles.rune} src = "https://pbs.twimg.com/media/Ggt9Pf4XkAAmPNw.jpg"></img>
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