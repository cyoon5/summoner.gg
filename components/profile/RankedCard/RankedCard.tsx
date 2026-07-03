import { RankedProp } from "@/app/types/ranked"
import styles from "./RankedCard.module.css";
import Image from "next/image";




export default function RankedCard(prop: RankedProp){

    if(!prop.data)
        return (
            <>
                <p className = {styles.queueHeader}>{prop.queueType}</p>
                <p> Unranked </p>
            </>
        )
    
    return(
        <div className = {styles.rankedContainer}>

        
            <p className = {styles.queueHeader}>{prop.queueType}</p>

            <div className = {styles.rankedStatsHolder}>
                <Image
                    src = {`/emblems/${prop.data.tier}.png`}
                    alt = "challenger"
                    width = {54}
                    height = {54}
                />

                <div className = {styles.rankedStats}>

                    <span className = {styles.rankPoints}>
                          <span className = {styles.rank}>{prop.data.tier + " " + prop.data.division}</span>
                          <span>{prop.data.leaguePoints + " LP "  }</span>
                    </span>
                    <span className = {styles.winRatio}>
                        <span>{prop.data.wins + "W " + prop.data.losses + "L " }</span>
                        <span>{prop.data.winRate + " Win Rate"}</span>
                    </span>
                </div>

        
            </div>
        

        </div>
    )
}