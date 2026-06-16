import MatchCard from "@/components/profile/MatchCard/MatchCard";
import styles from "./page.module.css";
import Image from 'next/image'
import { SummonerData } from "@/app/types/summoner";
import { getSummoner } from "@/app/services/summonerService";
import { MatchCardProp, MatchInfo, ParticipantInfo } from "@/app/types/match";
import { getMatchInfo, getMatchParticipantsInfo, getRawMatches } from "@/app/services/matchService";
import { getCurrentPatch } from "@/app/services/dragonService";


export default async function Profile({ params }: {params: Promise<SummonerData>}) {
//add LP graph at top next to icon, Champ stats, live, player Tier

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

    //console.log(participantsInMatches[0]);

    const searchedSummoner = participantsInMatches.map(m => m.find(p => p.puuid === searchedSummonerId));
    const matchInfoList = rawMatches.map(m => (getMatchInfo(m)));
    const patch = await getCurrentPatch();

    

    
    
    return(
        <>
            <div className = {styles.container}>

                <div className = {styles.statsCol}> 
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
                            <h1>{data.gameName} 
                                <div className = {styles.tag}> #{data.tagLine}</div>
                            </h1>
                        </div>

                    </div>

                    <p className = {styles.statsBox}> Ranked Solo/Duo </p>
                    <p className = {styles.statsBox}> Ranked Flex </p>
                    <p className = {styles.statsBox}> Champion Stats </p>

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