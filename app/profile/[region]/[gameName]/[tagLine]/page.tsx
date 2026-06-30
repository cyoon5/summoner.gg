import MatchCard from "@/components/profile/MatchCard/MatchCard";
import styles from "./page.module.css";
import Image from 'next/image'
import { SummonerData } from "@/app/types/summoner";
import { getSummoner } from "@/app/services/summonerService";
import { getMatchInfo, getMatchParticipantsInfo, getRawMatches } from "@/app/services/matchService";
import { getSummonerRankedInfo } from "@/app/services/rankedService";


export default async function Profile({ params }: {params: Promise<SummonerData>}) {

    const { region, gameName, tagLine } = await params;

    const query: SummonerData = {
        region: region,
        gameName: gameName,
        tagLine: tagLine
    }

    const data = await getSummoner(query);
    const rawMatches = await getRawMatches(data);
    const participantsInMatches = getMatchParticipantsInfo(rawMatches); 

    const searchedSummonerId = data.puuid;  

    const searchedSummoner = participantsInMatches.map(m => m.find(p => p.puuid === searchedSummonerId));
    const matchInfoList = rawMatches.map(m => (getMatchInfo(m)));

    const rankedInfo = await getSummonerRankedInfo(data);
    

    

    
    
    return(
        <>
            <div className = {styles.summonerInfo}>

                    <div className = {styles.iconLvl}>

                        <Image
                            src={data.iconURL}
                            width={500}
                            height={500}
                            alt="Summoner Icon"
                            className={styles.icon}
                            loading = "eager"
                        />

                        <p className = {styles.lvl}>{data.accountLvl}</p>

                    </div>

                    <div className = {styles.nameTag}>
                        <h1 className = {styles.gameName}>
                            {data.gameName} 
                        </h1>
                        <h1 className = {styles.tag}>  
                            #{data.tagLine}
                        </h1>
                    </div>

            </div>
            <div className = {styles.container}>

                <div className = {styles.statsCol}> 
                    

                    <div className = {styles.statsBox}> 
                        <p>Ranked Solo/Duo</p>
                        {rankedInfo[0].tier + " " + rankedInfo[0].rank + " " + rankedInfo[0].leaguePoints + "LP"} 
                    </div>

                    <div className = {styles.statsBox}> Ranked Flex </div>
                    
                    <div className = {styles.statsBox}> Champion Stats </div>

                </div>

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
                    
                </div>

            </div>
        </>
    )
}