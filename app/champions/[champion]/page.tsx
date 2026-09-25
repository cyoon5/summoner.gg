import Image from "next/image"
import styles from "./page.module.css"
import { getChampionIconUrl } from "@/app/services/dragonService"
import { getChampionAnalytics } from "@/app/services/matchService"

export default async function Champion(){
    
    const championAnalytics = await getChampionAnalytics('Twisted Fate');
    

    return(
        <div className = {styles.container}>

            <div className = {styles.championContainer}>

                <Image
                    className = {styles.championIcon}
                    src = {getChampionIconUrl(4)}
                    width = {50}
                    height = {50}
                    alt = "Champion Icon"   
                    loading = "eager"
                />

                <div className = {styles.championInfo}>

                    <h1 className = {styles.championName}> Aatrox </h1>

                    <div className = {styles.rateContainer}>

                        <div className = {styles.rate}>
                            {championAnalytics.win_rate}% Win Rate
                        </div>

                        <div className = {styles.rate}>
                            {championAnalytics.pick_rate}% Pick Rate
                        </div>

                        <div className = {styles.rate}>
                            {championAnalytics.ban_rate}% Ban Rate
                        </div>

                        <div className = {styles.rate}>
                            {championAnalytics.matches_played} Matches
                        </div>

                        <div className = {styles.roleContainer}>

                        </div>

                    </div>

                </div>


            </div>

            <div className = {styles.runeContainer}>

            </div>

            <div className = {styles.counterContainer}>

            </div>

            <div className = {styles.buildContainer}>

            </div>
        </div>
    )
}