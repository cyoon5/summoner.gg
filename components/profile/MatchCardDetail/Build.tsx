import { BuildProp } from "@/app/types/match"
import styles from "./Build.module.css"
import Runes from "./Runes"

export default function Build(props: BuildProp){


    return(
        <div className = {styles.buildContainer}>

            <div className = {styles.runeContainer}>
                Runes
                <Runes 
                    primaryRuneTree={props.participant.primaryRuneTree}
                    primaryRuneSelections={props.participant.primaryRuneSelections}
                    secondaryRuneTree={props.participant.secondaryRuneTree}
                    secondaryRuneSelections={props.participant.secondaryRuneSelections}
                    statPerks={props.participant.statPerks}
                />
            </div>

        </div>
    )
}