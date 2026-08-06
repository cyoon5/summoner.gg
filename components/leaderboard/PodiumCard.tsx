'use client'

import {PodiumPlayers } from "@/app/types/leaderboard"
import styles from "./PodiumCard.module.css"
import Image from "next/image"
import { useRouter } from 'next/navigation'

export default function PodiumCard(props: PodiumPlayers){
  const router = useRouter()




    return(

        <div className = {styles.container}>
            
            <div className = {styles.accountInfoContainer}>

                <div className = {styles.leaderboardRank}> 
                    {props.leaderboardRanking}
                </div>

                <Image
                    className = {styles.profileIcon}
                    src = {props.profileIconUrl}
                    alt = "Profile Icon"
                    width = {50}
                    height = {50}
                />

                <div className = {styles.accountInfo}>
                    <span 
                        onClick={()=> router.push(`/profile/${props.region}/${props.gameName}/${props.tagLine}`)}
                        className = {styles.gameName}>{props.gameName}
                    </span>
                    <span className = {styles.tagLine}>#{props.tagLine}</span>
                </div>

            </div>

            <div className = {styles.rankInfoContainer}>

                <Image 
                    className = {styles.emblem}
                    src = {`/emblems/${props.tier.toLowerCase()}.png`}
                    alt = "Rank Emblem"
                    width = {50}
                    height = {50}
                />

                <div className = {styles.rankContainer}>
                    <span className = {styles.tier}> {props.tier.toUpperCase()}</span>
                    <span className = {styles.lp}> {props.leaguePoints} LP</span>
                </div>

                <div className = {styles.playerRecord}> 
                    <p className = {styles.winlossCount}>{props.wins}W {props.losses}L</p>
                    <p className = {styles.winRate}>{((props.wins/(props.wins + props.losses))*100).toFixed(0)}% Win Rate</p>
                </div>

            </div>

        </div>
    )
}