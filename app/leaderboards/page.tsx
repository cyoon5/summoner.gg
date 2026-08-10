'use client'

import styles from "./page.module.css"
import { useEffect, useState } from "react"
import { leaderboardEntry } from "../types/leaderboard";
import RankOneCard from "@/components/leaderboard/RankOneCard";
import PodiumCard from "@/components/leaderboard/PodiumCard";
import LeaderboardCard from "@/components/leaderboard/LeaderboardCard";


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
    const regularSummoners = page == 1? summoners.slice(3) : summoners;

    return(
        
        <div className = {styles.leaderboardContainer}>

            <h1> Leaderboards </h1>

            <div className = {styles.leaderboardPlayers}>

                <div className = {styles.podium}>
                    
                    { 
                        rankOne && (
                            <RankOneCard 
                                {...rankOne}
                                summonerLevel={555}
                                profileIconUrl="https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1113.png"
                            />
                        )
                    }
                    {
                        rankTwo && (
                            <PodiumCard 
                                {...rankTwo}
                                summonerLevel={555}
                                profileIconUrl="https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1225.png"
                            />
                        )
                    }

                    {
                        rankThree && (
                            <PodiumCard 
                                {...rankThree}
                                summonerLevel={555}
                                profileIconUrl="https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1241.png"
                            />
                        )
                    }

                 </div>

                <div className = {styles.leaderboardRowContainer}>

                {

                    rankOne && <div className = {styles.leaderboardHeader}>

                        <div className = {styles.leaderboardRank}> Rank </div>
                        <div className = {styles.summoner}> Summoner </div>
                        <div className = {styles.region}> Region </div>
                        <div className = {styles.tier}> Tier </div>
                        <div className = {styles.lp}> LP </div>
                        <div className = {styles.winrate}> Win Rate </div>  

                    </div>
                }    

                    {   
                        regularSummoners.map(p => 
                            <LeaderboardCard 
                                key = {p.puuid}
                                puuid={p.puuid} 
                                gameName={p.gameName} 
                                tagLine={p.tagLine} 
                                tier={p.tier} 
                                division={p.division} 
                                leaguePoints={p.leaguePoints} 
                                wins={p.wins} 
                                losses={p.losses} 
                                region={p.region} 
                                leaderboardRanking={p.leaderboardRanking}                                            
                            />
                        )
                    }

                </div>
                

    
            </div>

                
            <div className = {styles.page}>
                
            </div>
            

        </div>
    )
}