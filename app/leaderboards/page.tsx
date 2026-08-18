'use client'

import styles from "./page.module.css"
import { useEffect, useState } from "react"
import { leaderboardEntry } from "../types/leaderboard";
import RankOneCard from "@/components/leaderboard/RankOneCard";
import PodiumCard from "@/components/leaderboard/PodiumCard";
import LeaderboardCard from "@/components/leaderboard/LeaderboardCard";
import { LEADERBOARD_QUEUE_MAP, regions } from "../constants"
import parseSummoner from "@/lib/parseSummoner";
import { getProfileIconUrl } from "../services/dragonService";

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
    const [searchedPuuid, setSearchedPuuid] = useState("");
    const [searchError, setSearchError] = useState(false);
    const [error, setError] = useState(false);

    
    const visiblePages = 9;
    const startPage = Math.max(1, page-4);
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    const queues = ["RANKED_SOLO_5x5", "RANKED_FLEX_SR"];

    useEffect(() => {

        setError(false);
        setLoading(true);

        const fetchSummoners = async() => {
            const res = await fetch(`api/leaderboard/?region=${region}&queue=${queue}&page=${page}`);
            if(!res.ok){
                setError(true);
                setLoading(false);
                return;
            }
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
        e.preventDefault();

        if(!searchInput)
            return;

        setSearchError(false);
        const parsedSummoner = parseSummoner(searchInput);
        
        if(!parsedSummoner){
            setSearchError(true);
            setSearchedPuuid("");
            return;
        }

        setLoading(true);
        const formattedSummoner = `${parsedSummoner.gameName}-${parsedSummoner.tagLine}`;
        const res = await fetch(`api/leaderboard/?region=${region}&queue=${queue}&riotId=${formattedSummoner}`);

        if(!res.ok) 
        {
            setLoading(false);
            setSearchError(true);
            setSearchedPuuid("");
            return;
        }
        
        const searchedSummonerData = await res.json();
        const searchedPage = searchedSummonerData.pageNumber;

        if(searchedPage !== page)
            setPage(searchedPage);
        else
            setLoading(false);

        setSearchedPuuid(searchedSummonerData.puuid);

    }

    

    return(
        
        <div className = {styles.container} onClick = {() => {setRegionOpen(false); setQueueOpen(false)}}>

            <h1> Leaderboards </h1>


            {
                error && <div className = {styles.error}> 
                    <h1> Something went wrong </h1>
                    <p className = {styles.back} onClick={()=>{setError(false); setRegion("na1")}}> Return</p>
                </div>
            }


           { 
            !error && <div className = {styles.leaderboardContainer}>

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
                                        onClick={(e) => { setRegionOpen(false); setRegion(r.value); setPage(1); setSearchedPuuid(""); setSearchError(false); e.stopPropagation();}}
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
                                            onClick={(e) => { setQueueOpen(false); setQueue(r); setPage(1); setSearchedPuuid(""); setSearchError(false); e.stopPropagation();}}
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

                    {   
                        searchError && <div className={styles.error}>
                            <h1>Summoner not found</h1>
                            <p className = {styles.hint}>Please ensure that the id is in the format <span className ={styles.riotFormatText}>gameName#tagLine</span> and that the player is currently in an Apex rank.</p>
                            <p className = {styles.back} onClick={()=>{setSearchError(false);}}> Return</p>
                        </div>
                    
                    }

                    {
                        !searchError && <div className = {styles.podium}>
                        

                            { 
                                (!loading && page === 1 && rankOne) && (
                                    <RankOneCard 
                                        {...rankOne}
                                        summonerLevel={rankOne.summonerLevel!}
                                        profileIconUrl={getProfileIconUrl(rankOne.profileIconId!)}
                                    />
                                )
                            }
                            {
                                (!loading && page === 1 && rankTwo) && (
                                    <PodiumCard 
                                        {...rankTwo}
                                        summonerLevel={rankTwo.summonerLevel!}
                                        profileIconUrl={getProfileIconUrl(rankTwo.profileIconId!)}
                                    />
                                )
                            }

                            {
                                (!loading && page ===1 && rankThree) && (
                                    <PodiumCard 
                                        {...rankThree}
                                        summonerLevel={rankThree.summonerLevel!}
                                        profileIconUrl={getProfileIconUrl(rankThree.profileIconId!)}
                                    />
                                )
                            }

                        </div>
                    } 

                    {
                        !searchError && !loading && <div className = {styles.leaderboardRowContainer}>

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
                                        highlighted = {p.puuid === searchedPuuid}
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
                                        onClick = {()=> {setPage(p => p-1); setSearchedPuuid(""); setSearchInput("")}}
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
                                                onClick={() => {setPage(pageNumber); setSearchedPuuid("");  setSearchInput("");}}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    }
                                )}

                                {
                                    page != totalPages && <button 
                                        className = {styles.pageBtn}
                                        onClick = {()=> {setPage(p => p+1); setSearchedPuuid("");  setSearchInput("");}}
                                    >
                                        Next
                                    </button>
                                }
                            </div>

                        </div>
                    }
        
                </div>
            }
        </div>
    )
}