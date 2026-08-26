'use client'

import styles from "./PostGame.module.css"
import { ParticipantInfo, PostGameProp } from "@/app/types/match"
import SummonerRow from "./SummonerRow"

export default function PostGame(props: PostGameProp){


    return(

        <div className = {styles.postGameContainer}>

            <div className = {styles.summonerTeamDetails}>
                <div className = {props.participant.win? styles.victory : styles.defeat}>
                    <p className = {styles.gameOutcome}> {props.participant.win? "Victory": "Defeat"} ({props.participant.team === "red"? "Red" : "Blue"} Side) </p>
                    <p> KDA </p>
                    <p> Damage </p>
                    <p> Gold </p>
                    <p> CS </p>
                    <p> Wards </p>
                    <p> Items </p>
                </div>

                {
                    props.participants.filter((p:ParticipantInfo) => p.team === props.participant.team).map((p:ParticipantInfo) => (
                        <SummonerRow
                            participant = {p} 
                            searchedParticipant = {props.participant} 
                            maxDamage = {props.maxDamage} 
                            platform = {props.platform} 
                            rank = {props.rankPreviewData.find(r => r.puuid === p.puuid)?.rankInfoPreview}
                            key = {p.puuid}
                        />
                    ))
                }
            </div>


            <div className = {styles.enemyTeamDetails}>
                <div className = {props.participant.win? styles.defeat : styles.victory}>
                    <p className = {styles.gameOutcome}> {props.participant.win? "Defeat" : "Victory"}  ({props.participant.team === "red"? "Blue" : "Red"} Side) </p>
                    <p> KDA </p>
                    <p> Damage </p>
                    <p> Gold </p>
                    <p> CS </p>
                    <p> Wards </p>
                    <p> Items </p>
                </div>

                {
                    props.participants.filter((p:ParticipantInfo) => p.team !== props.participant.team).map((p:ParticipantInfo) => (
                        <SummonerRow 
                            participant = {p} 
                            searchedParticipant = {props.participant} 
                            maxDamage = {props.maxDamage} 
                            platform = {props.platform}
                            rank = {props.rankPreviewData.find(r => r.puuid === p.puuid)?.rankInfoPreview}
                            key = {p.puuid} 
                        />
                    ))
                }

            </div>
        </div>
    )
}