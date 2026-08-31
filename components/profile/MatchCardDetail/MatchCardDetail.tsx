'use client';

import { MatchCardDetailProp, ParticipantInfo, RankPreviewResponse } from "@/app/types/match";
import styles from "./MatchCardDetail.module.css"
import { useState, useEffect } from "react";
import PostGame from "./PostGame";
import Performance from "./Performance";
import Build from "./Build";


export default function MatchCardDetail(props: MatchCardDetailProp){


    type DetailsTab = "postGame" | "performance" | "build" | "metrics";
    const [detailsTab, setDetailsTab] = useState<DetailsTab>("postGame")
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

                {/* <button className={`${styles.detailsTab} ${detailsTab === "metrics" ? styles.selectedDetailsTab : ""}`} onClick = {() => setDetailsTab("metrics")}>
                    Metrics 
                </button> */}

            </div>

            { 
                detailsTab === "postGame" && <PostGame
                    participants={props.participants}
                    participant={props.participant}
                    maxDamage={props.maxDamage}
                    platform={props.platform}
                    rankPreviewData={rankPreviewData}
                />
            }
            
            { 
                detailsTab === "performance" &&  <Performance
                    participants={props.participants}
                    maxDamage={props.maxDamage}
                    platform={props.platform}
                    rankPreviewData={rankPreviewData}
                />
            }
                
            
            { 
                detailsTab === "build" && <Build
                    participant={props.participant}
                    participants={props.participants}
                />
            }

            
            {/* { detailsTab === "metrics" && (
                <div className = {styles.metricsContainer}>
                    Metrics
                </div>
            )} */}
   
        </div>
        
    )
}