import { RankedData } from "@/app/types/ranked"
import styles from "./RankedCard.module.css";




export default function RankedCard(props: RankedData){


    return(
        <div className = {styles.rankInfoHolder}>
            <p>{props.tier + " " + props.division}</p>
            <p>{props.leaguePoints + " LP"}</p>
        </div>
    )
}