'use client'

import { getLeaderboard } from "@/app/services/leaderboardService"
import styles from "./page.module.css"
import { useEffect, useState } from "react"
import { leaderboardEntry } from "../types/leaderboard";
import RankOneCard from "@/components/leaderboard/RankOneCard";
import PodiumCard from "@/components/leaderboard/PodiumCard";

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

    const rankOne = summoners[0];
    const rankTwo = summoners[1];
    const rankThree = summoners[2];


    return(
        
        <div className = {styles.leaderboardContainer}>

            <div className = {styles.content}>

            </div>

            <h1> Leaderboards </h1>
            { 
                rankOne && (
                    <RankOneCard 
                        {...rankOne}
                        summonerLevel={555}
                        profileIconUrl="https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1555.png"
                    />
                )
            }

            <div className = {styles.podium}>
                {
                    rankTwo && (
                        <PodiumCard 
                            {...rankTwo}
                            summonerLevel={555}
                            profileIconUrl="https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1555.png"
                        />
                    )
                }

                {
                    rankThree && (
                        <PodiumCard 
                            {...rankThree}
                            summonerLevel={555}
                            profileIconUrl="https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1555.png"
                        />
                    )
                }
                
            </div>

            <div className = {styles.leaderboardRows}>
                {
                    
                }

            </div>
                
          
            

        </div>
    )
}