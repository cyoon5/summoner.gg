'use client'

import { getLeaderboard } from "@/app/services/leaderboardService"
import styles from "./page.module.css"
import { useEffect, useState } from "react"
import { leaderboardEntry } from "../types/leaderboard";
import RankOneCard from "@/components/leaderboard/RankOneCard";

export default function Leaderboard(){

    const [page, setPage] = useState(1);
    const [region, setRegion] = useState("na1");
    const [queue, setQueue] = useState("RANKED_SOLO_5x5");
    const [summoners, setSummoners] = useState<leaderboardEntry[]>([]);


    useEffect(() => {
        const fetchSummoners = async() => {
            const res = await fetch(`api/leaderboard/?region=${region}&queue=${queue}&page=${page}`);
            const data = await res.json();
            setSummoners(data.leaderboard);
        }

        fetchSummoners();
        
    }, [page, region, queue]);



    return(
        <div className = {styles.leaderboardContainer}>
            <h1> Leaderboards </h1>
            {
                summoners.map((p,i) => 
                    <RankOneCard 
                        key = {p.puuid}
                        puuid = {p.puuid} 
                        gameName = {p.gameName}
                        tagLine= {p.tagLine}
                        tier={p.tier}
                        division={p.division}
                        leaguePoints={p.leaguePoints}
                        wins={p.wins}
                        losses={p.losses}
                        region={p.region}
                        profileIconUrl={"https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1430.png"}
                        summonerLevel={555}
                        leaderboardRanking={i}
                    />

                )
            }
            

        </div>
    )
}