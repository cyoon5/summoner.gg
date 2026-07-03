import { RankedData } from "@/app/types/ranked"
import { RANKED_MAP } from "@/app/services/constants"
import styles from "./RankedCard.module.css";




export default function RankedCard(props: RankedData){



    return(
        <div className = {styles.rankInfoHolder}>
            <p> {RANKED_MAP.get(props.queueType)}</p>
            <p>{props.tier + " " + props.division}</p>
            <p>{props.leaguePoints + " LP"}</p>
        </div>
    )
}