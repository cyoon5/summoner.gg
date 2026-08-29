import { RunesProp } from "@/app/types/match"
import styles from "./Runes.module.css"
import Image from "next/image"
import { getRuneIconUrl } from "@/app/services/dragonService"

export default function Runes(props: RunesProp){

    const primaryTreeIcon = getRuneIconUrl(props.primaryRuneTree);

    return(

        <div className = {styles.container}>

            {
                primaryTreeIcon && <div className = {styles.runeContainer}>
                    <div className = {styles.primaryTreeContainer}>
                        <Image
                            className = {styles.primaryTreeIcon}
                            src = { primaryTreeIcon }
                            width = {50}
                            height = {50}
                            alt = {"Rune Image"}
                            loading = "eager"
                        />
                    </div>

                    <div className = {styles.secondaryTreeContainer}>

                        
                    </div>
                </div>
            }
    
        </div>
    )
}