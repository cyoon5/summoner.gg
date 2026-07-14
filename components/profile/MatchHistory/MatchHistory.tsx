'use client'

import { MatchHistoryProp } from "@/app/types/match";
import styles from "./MatchHistory.module.css";
import MatchCard from "../MatchCard/MatchCard";
import { useEffect, useRef } from "react";


export default function MatchHistory(props: MatchHistoryProp){

    const bottomRef = useRef(null);
    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                console.log("bottom seen")
            }
        });

        if(bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => observer.disconnect(); 

    }, []);


    return(

        <div className = {styles.matchCol}>

            <p className = {styles.matchHeader}> Match History</p>

            <div className = {styles.matchHolder}> 
            {

                props.searchedSummoner.map((m, i) => 
                    m && <MatchCard
                        key = {m.matchId}
                        participant = {m}
                        participants = {props.participantsInMatches[i]}
                        matchInfo = {props.matchInfoList[i]}
                    />
                )
            
            }
            </div>

            <div ref={bottomRef}></div>

                    
        </div>

        

    )
}