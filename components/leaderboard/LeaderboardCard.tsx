'use client'

import { leaderboardEntry } from "@/app/types/leaderboard"
import styles from "./LeaderboardCard.module.css"
import { regions } from "@/app/constants"
import { useRouter } from 'next/navigation'



export default function LeaderboardCard(props: leaderboardEntry){

    const router = useRouter();

    return(

        <div className = {props.leaderboardRanking%2 == 0? styles.container1 : styles.container2}>

            <div className = {styles.leaderboardRank}>
                {props.leaderboardRanking}
            </div>

            <div className = {styles.gameName} onClick={()=> router.push(`/profile/${props.region}/${props.gameName}/${props.tagLine}`)}>
                {props.gameName}
            </div>

            <div className = {styles.region}>
                {regions.find(p => p.value == props.region)?.label}
            </div>

            <div className = {styles.tier}>
                {props.tier.toUpperCase()}
            </div>

            <div className = {styles.lp}>
                {props.leaguePoints} LP
            </div>

            <div className = {styles.winrate}>
                {((props.wins/(props.wins + props.losses))*100).toFixed(0)}% {props.wins}W {props.losses}L 
            </div>
        
        </div>
    )

}