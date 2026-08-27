'use client'

import { PerformanceProp } from "@/app/types/match"
import styles from "./Performance.module.css"
import { useState } from "react";
import PerformanceRow from "./PerformanceRow";


export default function Performance(props: PerformanceProp){
    
    //Future feature: sort via rank

    type FilterTab = "kills" | "kda" | "damage" | "gold" | "cs" | "wards" ;
    const [filterTab, setFilterTab] = useState<FilterTab>("kills");
    const sortedParticipants = [...props.participants].sort((a,b) => {
        
        if(filterTab === "kills")
            return b.kills - a.kills;
        else if(filterTab === "kda")
            return (b.deaths === 0? Infinity : (b.kills + b.assists)/b.deaths) - (a.deaths === 0? Infinity : (a.kills + a.assists)/a.deaths);
        else if(filterTab === "damage")
            return b.damageDealt - a.damageDealt;
        else if(filterTab === "gold")
            return b.totalGoldEarned - a.totalGoldEarned;
        else if(filterTab === "cs")
            return b.creepScore - a.creepScore;
        else if(filterTab === "wards")
            return b.visionScore - a.visionScore;    
        else 
            return 0;
    });

    return(
        <div className = {styles.performanceContainer}>

            <div className = {styles.filterContainer}>

                <div className = {styles.playerColumn}>
                    Summoner
                </div>

                <button className={`${styles.filterTab} ${filterTab === "kills" ? styles.selectedFilterTab : ""}`} onClick = {() => setFilterTab("kills")}>
                    Kills
                </button>

                <button className={`${styles.filterTab} ${filterTab === "kda" ? styles.selectedFilterTab : ""}`} onClick = {() => setFilterTab("kda")}>
                    KDA
                </button>
                
                <button className={`${styles.filterTab} ${filterTab === "damage" ? styles.selectedFilterTab : ""}`} onClick = {() => setFilterTab("damage")}>
                    Damage
                </button>

                <button className={`${styles.filterTab} ${filterTab === "gold" ? styles.selectedFilterTab : ""}`} onClick = {() => setFilterTab("gold")}>
                    Gold
                </button>
                               
                <button className={`${styles.filterTab} ${filterTab === "cs" ? styles.selectedFilterTab : ""}`} onClick = {() => setFilterTab("cs")}>
                    CS
                </button>

                <button className={`${styles.filterTab} ${filterTab === "wards" ? styles.selectedFilterTab : ""}`} onClick = {() => setFilterTab("wards")}>
                    Wards
                </button>
 
            </div>
        
            <div className = {styles.rowContainer}>
                {
                    sortedParticipants.map(p => <PerformanceRow
                            key = {p.puuid}
                            participant={p}
                            maxDamage={props.maxDamage}
                            rank = {props.rankPreviewData.find(r => r.puuid === p.puuid)?.rankInfoPreview}
                            platform={props.platform}
                        />
                    )
                }
            </div>

        </div>
    )
}