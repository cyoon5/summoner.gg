'use client'

import { MatchHistoryProp } from "@/app/types/match";
import styles from "./MatchHistory.module.css";
import MatchCard from "../MatchCard/MatchCard";
import { useEffect, useRef, useState } from "react";


export default function MatchHistory(props: MatchHistoryProp){


    const [searchedSummoner, setSearchedSummoner] = useState(props.initialSearchedSummoner)
    const [participantsInMatches, setParticipantsInMatches] = useState(props.initialParticipantsInMatches)
    const [matchInfoList, setMatchInfoList] = useState(props.initialMatchInfoList)
    const [offset, setOffset] = useState(10);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const bottomRef = useRef(null);

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {

            const loadMoreMatches = async() =>{
                if(loading || !hasMore)
                    return;
                setLoading(true);
                const res = await fetch(`/api/matches?puuid=${props.puuid}&routing=${props.routing}&start=${offset}&count=10`);
                const data = await res.json();

                setSearchedSummoner(s => [...s, ...data.searchedSummoner]);
                setParticipantsInMatches(s => [...s, ...data.participantsInMatches]);
                setMatchInfoList(s => [...s, ...data.matchInfoList]);
                
                setOffset(m => m + 10);
                setLoading(false);
                if(data.searchedSummoner.length < 10)
                    setHasMore(false);
            }

            if(entries[0].isIntersecting) {
                loadMoreMatches();
            }
        });

        if(bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => observer.disconnect(); 

    }, [hasMore, offset]);




    return(

        <div className = {styles.matchCol}>

            <p className = {styles.matchHeader}> Match History</p>

            <div className = {styles.matchHolder}> 
            {

                searchedSummoner.map((m, i) => 
                    m && <MatchCard
                        key = {m.matchId}
                        participant = {m}
                        participants = {participantsInMatches[i]}
                        matchInfo = {matchInfoList[i]}
                    />
                )
            
            }

            </div>

            <div ref={bottomRef}></div>

        </div>

    )
}