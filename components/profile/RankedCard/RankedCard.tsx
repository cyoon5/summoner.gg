import { RankedProp } from "@/app/types/ranked"
import styles from "./RankedCard.module.css";




export default function RankedCard(prop: RankedProp){

    if(!prop.data)
        return (
            <>
                {prop.queueType}
                <p> Unranked </p>
            </>
        )
    
    return(
        <div className = {styles.rankInfoHolder}>
            {prop.queueType}
            <p>{prop.data.tier + " " + prop.data.division}</p>
            <p>{prop.data.leaguePoints + " LP"}</p>
        </div>
    )
}