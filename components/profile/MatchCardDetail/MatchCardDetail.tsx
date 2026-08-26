'use client';

import { MatchCardDetailProp, ParticipantInfo } from "@/app/types/match";
import styles from "./MatchCardDetail.module.css"
import SummonerRow from "./SummonerRow";
import { useState } from "react";


export default function MatchCardDetail(prop: MatchCardDetailProp){

    const [detailsTab, setDetailsTab] = useState("postGame")

    return(
        
        <div className = {styles.detailsContainer}>

            <div className = {styles.detailTabContainer}>

                <button className={`${styles.detailsTab} ${detailsTab === "postGame" ? styles.selectedDetailsTab : ""}`} onClick = {() => setDetailsTab("postGame")}>
                    Post Game
                </button>

                <button className={`${styles.detailsTab} ${detailsTab === "performance" ? styles.selectedDetailsTab : ""}`} onClick = {() => setDetailsTab("performance")}>
                    Performance
                </button>

                <button className={`${styles.detailsTab} ${detailsTab === "build" ? styles.selectedDetailsTab : ""}`} onClick = {() => setDetailsTab("build")}>
                    Build
                </button>

                <button className={`${styles.detailsTab} ${detailsTab === "metrics" ? styles.selectedDetailsTab : ""}`} onClick = {() => setDetailsTab("metrics")}>
                    Metrics 
                </button>

            </div>

            { detailsTab === "postGame" && (

                <div className = {styles.postGameContainer}>

                    <div className = {styles.summonerTeamDetails}>
                        <div className = {prop.participant.win? styles.detailsHeaderVictory : styles.detailsHeaderDefeat}>
                            <p className = {styles.gameOutcome}> {prop.participant.win? "Victory": "Defeat"} ({prop.participant.team == "red"? "Red" : "Blue"} Side) </p>
                            <p> KDA </p>
                            <p> Damage </p>
                            <p> Gold </p>
                            <p> CS </p>
                            <p> Wards </p>
                            <p> Items </p>
                        </div>

                        {
                            prop.participants.filter((p:ParticipantInfo) => p.team == prop.participant.team).map((p:ParticipantInfo) => (
                                    <SummonerRow participant = {p} searchedParticipant = {prop.participant} maxDamage = {prop.maxDamage} platform = {prop.platform} key = {p.puuid}/>
                            ))
                        }
                    </div>


                    <div className = {styles.enemyTeamDetails}>
                        <div className = {prop.participant.win? styles.detailsHeaderDefeat : styles.detailsHeaderVictory}>
                            <p className = {styles.gameOutcome}> {prop.participant.win? "Defeat" : "Victory"}  ({prop.participant.team == "red"? "Blue" : "Red"} Side) </p>
                            <p> KDA </p>
                            <p> Damage </p>
                            <p> Gold </p>
                            <p> CS </p>
                            <p> Wards </p>
                            <p> Items </p>
                        </div>

                        {
                            prop.participants.filter((p:ParticipantInfo) => p.team != prop.participant.team).map((p:ParticipantInfo) => (
                                <SummonerRow participant = {p} searchedParticipant = {prop.participant} maxDamage = {prop.maxDamage} key = {p.puuid} platform = {prop.platform}/>
                            ))
                        }

                    </div>
                </div>
            )}
            
            { detailsTab === "performance" && (
                <div className = {styles.performanceContainer}>
                    Performance
                </div>
            )}
               

            
            { detailsTab === "build" && (
                <div className = {styles.buildContainer}>
                    Build
                </div>
            )}

            
            { detailsTab === "metrics" && (
                <div className = {styles.metricsContainer}>
                    Metrics
                </div>
            )}
   
        </div>
        
    )
}