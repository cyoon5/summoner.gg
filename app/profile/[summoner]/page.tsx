import MatchCard from "@/components/profile/MatchCard/MatchCard";
import styles from "./page.module.css";
import Image from 'next/image'

export default async function Profile({ params }: {params: Promise<{summoner: string}>}) {
//search -> profile -> api call -> display
//add LP graph at top next to icon
    
    const userInfo = await params;
    const [gameName, tagLine] = userInfo.summoner.split("-");
    const response = await fetch(`http://localhost:3000/api/riot?gameName=${gameName}&tagLine=${tagLine}`);
    const data = await response.json(); //convert response stream into usable JavaScript object
    const iconId = data.profileIconId;
    const lvl = data.summonerLevel;
    const link = `https://ddragon.leagueoflegends.com/cdn/16.10.1/img/profileicon/${iconId}.png`;

    //TODO: retrieve current patch and update link
    
    return(
        <>


    
            <div className = {styles.container}>

                <div className = {styles.statsCol}> 
                    <div className = {styles.summonerInfo}>

                        <div className = {styles.iconLvl}>

                            <Image
                                src={link}
                                width={500}
                                height={500}
                                alt="Summoner Icon"
                                className={styles.icon}
                                loading = "eager"
                            />

                            <p className = {styles.lvl}>{lvl}</p>

                        </div>

                        <div className = {styles.nameTag}>
                            <h1>{gameName} 
                                <div className = {styles.tag}> #{tagLine}</div>
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