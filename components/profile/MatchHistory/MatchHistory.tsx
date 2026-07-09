'use client'
import { MatchHistoryProp } from "@/app/types/match";
import styles from "./MatchHistory.module.css";
import MatchCard from "../MatchCard/MatchCard";

export default function MatchHistory(props: MatchHistoryProp){


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
                    
        </div>

    )
}