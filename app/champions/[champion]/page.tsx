'use client'

import Image from "next/image"
import styles from "./page.module.css"
import { getChampionIconUrl } from "@/app/services/dragonService"
export default function Champion(){




    return(
        <div className = {styles.container}>

            <div className = {styles.championContainer}>

                <Image
                    className = {styles.championIcon}
                    src = {getChampionIconUrl(4)}
                    width = {50}
                    height = {50}
                    alt = "Champion Icon"
                />

                <div className = {styles.championInfo}>

                    <h1 className = {styles.championName}> Aatrox </h1>

                    <div className = {styles.rateContainer}>

                        <div className = {styles.rate}>
                            51.15% Winrate
                        </div>

                        <div className = {styles.rate}>
                            7.15% Pickrate
                        </div>

                        <div className = {styles.rate}>
                            3.16% Banrate
                        </div>

                        <div className = {styles.rate}>
                            30 matches
                        </div>

                        <div className = {styles.roleContainer}>

                        </div>

                    </div>

                </div>


            </div>

            <div className = {styles.runeContainer}>
                    <h3 className = {styles.runeHeader}>Aatrox Runes</h3>
            </div>

            <div className = {styles.counterContainer}>

            </div>

            <div className = {styles.buildContainer}>

            </div>
        </div>
    )
}