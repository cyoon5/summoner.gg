'use client'

import styles from "./page.module.css"
import { useEffect, useState } from "react"
import { leaderboardEntry } from "../types/leaderboard";
import RankOneCard from "@/components/leaderboard/RankOneCard";
import PodiumCard from "@/components/leaderboard/PodiumCard";
import LeaderboardCard from "@/components/leaderboard/LeaderboardCard";
import { LEADERBOARD_QUEUE_MAP, regions } from "../constants"


export default function Leaderboard(){

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [region, setRegion] = useState("na1");
    const [queue, setQueue] = useState("RANKED_SOLO_5x5");
    const [summoners, setSummoners] = useState<leaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [regionOpen, setRegionOpen] = useState(false);
    const [queueOpen, setQueueOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");


    
    const visiblePages = 9;
    const startPage = Math.max(1, page-4);
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    const queues = ["RANKED_SOLO_5x5", "RANKED_FLEX_SR"];

    useEffect(() => {
        setLoading(true);

        const fetchSummoners = async() => {
            const res = await fetch(`api/leaderboard/?region=${region}&queue=${queue}&page=${page}`);
            const data = await res.json();
            setSummoners(data.leaderboard);
            setTotalPages(data.totalPages);
            setLoading(false);
        }

        fetchSummoners();
        
    }, [page, region, queue]);

    const rankOne = summoners[0];
    const rankTwo = summoners[1];
    const rankThree = summoners[2];
    const regularSummoners = page == 1? summoners.slice(3) : summoners;


    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        

    }

    

    return(
        
        <div className = {styles.container} onClick = {() => {setRegionOpen(false); setQueueOpen(false)}}>

            <h1> Leaderboards </h1>


            <div className = {styles.leaderboardContainer}>

                { 
                    !loading && <div className = {styles.filters}>

                        <p>Filters</p>

                        <div className={styles.dropdownButtonRegion} onClick={(e)=> {setRegionOpen(o => !o); setQueueOpen(false); e.stopPropagation()}}>

                            <div>
                                {regions.find(r => r.value === region)?.label} ▾
                            </div>  
                            
                            {
                            regionOpen && (<div className = {styles.regionOptions}>
                                {
                                regions.map(r => (
                                    <div 
                                    key = {r.value} 
                                    className = {styles.regionOption}
                                    onClick={(e) => { setRegionOpen(false); setRegion(r.value); setPage(1); e.stopPropagation();}}
                                    > 
                                    {r.label}
                                    </div>
                                ))
                                }
                            </div>)
                            }
                            
                        </div>   

                        <div className={styles.dropdownButtonQueue} onClick={(e)=> {setQueueOpen(o => !o); setRegionOpen(false); e.stopPropagation()}}>

                            <div className = {styles.regionText}>
                                {LEADERBOARD_QUEUE_MAP.get(queue)} ▾
                            </div>  
                            
                            {
                            queueOpen && (<div className = {styles.queueOptions}>
                                {
                                queues.map(r => (
                                    <div 
                                        key = {r}
                                        className = {styles.queueOption}
                                        onClick={(e) => { setQueueOpen(false); setQueue(r); setPage(1); e.stopPropagation();}}
                                        > 
                                        {LEADERBOARD_QUEUE_MAP.get(r)}
                                    </div>
                                ))
                                }
                            </div>)
                            }
                            
                        </div> 

                        <form onSubmit={handleSubmit} className={styles.searchForm}>
                            <input type = "search" 
                                className = {styles.searchbar} 
                                placeholder = "Search Riot Id"
                                autoComplete = "off" 
                                onChange = {(e)=>setSearchInput(e.target.value)}>
                            </input>
                        </form>
            

                    </div>
                }

                {loading && <div className={styles.loadingSpinner}></div>}

                <div className = {styles.podium}>
                    

                    { 
                        (!loading && page === 1 && rankOne) && (
                            <RankOneCard 
                                {...rankOne}
                                summonerLevel={555}
                                profileIconUrl="https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1113.png"
                            />
                        )
                    }
                    {
                        (!loading && page === 1 && rankTwo) && (
                            <PodiumCard 
                                {...rankTwo}
                                summonerLevel={555}
                                profileIconUrl="https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1225.png"
                            />
                        )
                    }

                    {
                        (!loading && page ===1 && rankThree) && (
                            <PodiumCard 
                                {...rankThree}
                                summonerLevel={555}
                                profileIconUrl="https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1241.png"
                            />
                        )
                    }

                 </div>

                {
                    !loading &&  <div className = {styles.leaderboardRowContainer}>

                        {

                            <div className = {styles.leaderboardHeader}>

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


                        <div className = {styles.pageContainer}>

                            {
                                page != 1 && <button 
                                    className = {styles.pageBtn}
                                    onClick = {()=> setPage(p => p-1)}
                                >
                                    Prev
                                </button>
                            }

                            {Array.from(
                                { length: endPage - startPage + 1 },
                                (_, i) => {

                                    const pageNumber = startPage + i;
                                    
                                    return (
                                        <button
                                            className = {page === pageNumber? styles.currentPageBtn : styles.pageBtn}
                                            key={pageNumber}
                                            onClick={() => setPage(pageNumber)}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                }
                            )}

                            {
                                page != totalPages && <button 
                                    className = {styles.pageBtn}
                                    onClick = {()=> setPage(p => p+1)}
                                >
                                    Next
                                </button>
                            }
                        </div>

                    </div>
                }
    
            </div>
        </div>
    )
}