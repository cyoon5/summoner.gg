import MatchCard from "@/components/profile/MatchCard/MatchCard";
import styles from "./page.module.css";
import Image from 'next/image'
import { SummonerData } from "@/app/types/summoner";
import { getSummoner } from "@/app/services/summonerService";

export default async function Profile({ params }: {params: Promise<SummonerData>}) {
//add LP graph at top next to icon, Champ stats, live, player Tier

    const { region, gameName, tagLine } = await params;

    const query: SummonerData = {
        region: region,
        gameName: gameName,
        tagLine: tagLine
    }

    const data = await getSummoner(query);
    
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
                    <p className = {styles.statsBox}>Champion Stats</p>

                </div>

                <div className = {styles.matchCol}>
                    <p className = {styles.matchHeader}> Match History</p>
                    <div className = {styles.matchHolder}> 
                        <MatchCard/>
                        <MatchCard/>
                        <MatchCard/>
                        <MatchCard/>
                        <MatchCard/>
                        <MatchCard/>
                        <MatchCard/>
                    </div>
                </div>

            </div>
        </>
    )
}