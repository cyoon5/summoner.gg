'use client';

import { MatchCardDetailProp, ParticipantInfo, RankPreviewResponse } from "@/app/types/match";
import styles from "./MatchCardDetail.module.css"
import SummonerRow from "./SummonerRow";
import { useState, useEffect } from "react";


export default function MatchCardDetail(props: MatchCardDetailProp){

    const [detailsTab, setDetailsTab] = useState("postGame")
    const [rankPreviewData, setRankPreviewData] = useState<RankPreviewResponse[]>([]);



    useEffect(() => {

        const fetchRankPreview = async() => {
            const promises = props.participants.map((p:ParticipantInfo) => {
                return fetch(`/api/ranked/?puuid=${p.puuid}&platform=${props.platform}`);
            });
            const responses = await Promise.all(promises);
            const data = await Promise.all(responses.map(r => {return r.json()}));  
            setRankPreviewData(data);
        }

        fetchRankPreview();
    }, [])
    

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
                        <div className = {props.participant.win? styles.detailsHeaderVictory : styles.detailsHeaderDefeat}>
                            <p className = {styles.gameOutcome}> {props.participant.win? "Victory": "Defeat"} ({props.participant.team == "red"? "Red" : "Blue"} Side) </p>
                            <p> KDA </p>
                            <p> Damage </p>
                            <p> Gold </p>
                            <p> CS </p>
                            <p> Wards </p>
                            <p> Items </p>
                        </div>

                        {
                            props.participants.filter((p:ParticipantInfo) => p.team == props.participant.team).map((p:ParticipantInfo) => (
                                <SummonerRow 
                                    participant = {p} 
                                    searchedParticipant = {props.participant} 
                                    maxDamage = {props.maxDamage} 
                                    platform = {props.platform} 
                                    rank = {rankPreviewData.find(r => r.puuid == p.puuid)?.rankInfoPreview}
                                    key = {p.puuid}
                                />
                            ))
                        }
                    </div>


                    <div className = {styles.enemyTeamDetails}>
                        <div className = {props.participant.win? styles.detailsHeaderDefeat : styles.detailsHeaderVictory}>
                            <p className = {styles.gameOutcome}> {props.participant.win? "Defeat" : "Victory"}  ({props.participant.team == "red"? "Blue" : "Red"} Side) </p>
                            <p> KDA </p>
                            <p> Damage </p>
                            <p> Gold </p>
                            <p> CS </p>
                            <p> Wards </p>
                            <p> Items </p>
                        </div>

                        {
                            props.participants.filter((p:ParticipantInfo) => p.team != props.participant.team).map((p:ParticipantInfo) => (
                                <SummonerRow 
                                    participant = {p} 
                                    searchedParticipant = {props.participant} 
                                    maxDamage = {props.maxDamage} 
                                    platform = {props.platform}
                                    rank = {rankPreviewData.find(r => r.puuid == p.puuid)?.rankInfoPreview}
                                    key = {p.puuid} 
                                />
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