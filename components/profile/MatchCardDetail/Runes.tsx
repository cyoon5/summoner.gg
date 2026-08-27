import { RunesProp } from "@/app/types/match"
import styles from "./Runes.module.css"
import Image from "next/image"
import { getRuneIconUrl } from "@/app/services/dragonService"

export default function Runes(props: RunesProp){



    return(

        <div className = {styles.runeContainer}>
            <div className = {styles.primaryTreeContainer}>
                <Image
                    src = {getRuneIconUrl(props.primaryRuneTree)!}
                    width = {50}
                    height = {50}
                    alt = {"Rune Image"}
                />

            </div>

            <div className = {styles.secondaryTreeContainer}>

                
            </div>
        </div>
    )
}