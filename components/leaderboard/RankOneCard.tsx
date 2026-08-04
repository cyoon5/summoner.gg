'use client'

import { leaderboardEntry, PodiumPlayers } from "@/app/types/leaderboard"
import styles from "./RankOneCard.module.css"
import Image from "next/image"

export default function RankOneCard(props: PodiumPlayers){




    return(
        <div className = {styles.container}>

            <div className = {styles.leaderboardRank}> 
                1             
            </div>
                
            <div className = {styles.accountInfoContainer}> 

                <Image
                    src = {props.profileIconUrl}
                    alt = "Profile Icon"
                    width = {50}
                    height = {50}
                />

                <div className = {styles.accountInfo}>
                    <p>{props.gameName}#{props.tagLine}</p>
                    <p>{props.tier} {props.leaguePoints}LP</p>
                </div>
            </div>

            <div className = {styles.winRate}> 
                <p>{props.wins}W {props.losses}L</p>
                <p>{((props.wins/(props.wins + props.losses))*100).toFixed(0)}% Winrate</p>
            </div>
        </div>
    )
}