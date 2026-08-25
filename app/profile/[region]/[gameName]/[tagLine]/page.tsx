import styles from "./page.module.css";
import Image from 'next/image'
import { SummonerData } from "@/app/types/summoner";
import { getSummoner } from "@/app/services/summonerService";
import { getMatchInfo, getMatchParticipantsInfo, getRawMatches } from "@/app/services/matchService";
import { getSummonerRankedInfo } from "@/app/services/rankedService";
import RankedCard from "@/components/profile/RankedCard/RankedCard";
import { RankedData } from "@/app/types/ranked";
import  MatchHistory  from "@/components/profile/MatchHistory/MatchHistory";
import Navbar from "@/components/navigation/Navbar";
import { notFound } from "next/navigation";
import { SummonerNotFoundError } from "@/app/errors/SummonerNotFoundError";

export default async function Profile({ params }: {params: Promise<SummonerData>}) {

    const { region, gameName, tagLine } = await params;

    const query: SummonerData = {
        region: region,
        gameName: gameName,
        tagLine: tagLine
    }

    let summonerProfile;
    
    try{
        summonerProfile = await getSummoner(query);
    }
    catch(error){
        if (error instanceof SummonerNotFoundError) 
            notFound();
        throw error;
    }

    const rawMatches = await getRawMatches(summonerProfile.puuid, summonerProfile.matchRouting, 0, 10);
    const participantsInMatches = getMatchParticipantsInfo(rawMatches); 
    const searchedSummonerId = summonerProfile.puuid;  
    const searchedSummoner = participantsInMatches.map(m => m.find(p => p.puuid === searchedSummonerId));
    const matchInfoList = rawMatches.map(m => (getMatchInfo(m)));

    const rankedInfo = await getSummonerRankedInfo(summonerProfile);
    const soloQueue = rankedInfo.find((r:RankedData) => r.queueType=="RANKED_SOLO_5x5");
    const flexQueue = rankedInfo.find((r:RankedData) => r.queueType=="RANKED_FLEX_SR");

    
    return(
        <div className = {styles.container}>

            <div className ={styles.leftbar}></div>
            <div className ={styles.rightbar}></div>
            <Navbar/>
            
            <div className = {styles.profileContainer}>
                

                <div className = {styles.summonerInfo}>

                        <div className = {styles.iconLvl}>

                            <Image
                                src={summonerProfile.iconURL}
                                width={500}
                                height={500}
                                alt="Summoner Icon"
                                className={styles.icon}
                                priority
                            />

                            <p className = {styles.lvl}>{summonerProfile.accountLvl}</p>

                        </div>

                        <div className = {styles.nameTag}>
                            <h1 className = {styles.gameName}>
                                {summonerProfile.gameName} 
                            </h1>
                            <h1 className = {styles.tag}>  
                                #{summonerProfile.tagLine}
                            </h1>
                        </div>

                </div>

                <div className = {styles.columnContainer}>

                    <div className = {styles.statsCol}> 

                        <div className = {styles.rankedBox}>

                            <div className = {styles.statsBox}> 
                                <RankedCard 
                                        data = {soloQueue}
                                        queueType="Ranked Solo/Duo"
                                    />                       
                            </div>
                        
                            <div className = {styles.statsBox}> 
                                    <RankedCard 
                                        data = {flexQueue}
                                        queueType="Ranked Flex"
                                    />
                            </div>

                        </div>
                        
                        <div className = {styles.statsBox}> 
                            Champion Stats 
                        </div>

                    </div>


                    <MatchHistory 
                        puuid = {searchedSummonerId}
                        routing = {summonerProfile.matchRouting} //Requires MATCH-V5
                        platform = {summonerProfile.platform}
                        initialParticipantsInMatches = {participantsInMatches}
                        initialSearchedSummoner = {searchedSummoner}
                        initialMatchInfoList = {matchInfoList}
                    />


                </div>
            </div>
        </div>
    )
}