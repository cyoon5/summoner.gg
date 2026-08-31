import { BuildProp } from "@/app/types/match"
import styles from "./Build.module.css"
import Runes from "./Runes"

export default function Build(props: BuildProp){


    return(
        <div className = {styles.buildContainer}>

            <h2 className = {styles.buildHeader}>Runes</h2>
            <div className = {styles.runeContainer}>

                
                <Runes 
                    primaryRuneTree={props.participant.primaryRuneTree}
                    primaryRuneSelections={props.participant.primaryRuneSelections}
                    secondaryRuneTree={props.participant.secondaryRuneTree}
                    secondaryRuneSelections={props.participant.secondaryRuneSelections}
                    statPerks={props.participant.statPerks}
                />
            </div>

            <div className = {styles.levelOrderContainer}>
                {/* <h2 className = {styles.buildHeader}>Runes</h2> */}

            </div>

        </div>
    )
}