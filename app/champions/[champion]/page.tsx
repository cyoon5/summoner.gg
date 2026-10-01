import Image from "next/image"
import styles from "./page.module.css"
import { getChampionIconUrl } from "@/app/services/dragonService"
import { getChampionAnalytics } from "@/app/services/championService";
import Runes from "@/components/profile/MatchCardDetail/Runes";

export default async function Champion(){
    
    const championAnalytics = await getChampionAnalytics('Teemo');
    

    return(
        <div className = {styles.container}>

            <div className = {styles.championContainer}>

                {/* <Image
                    className = {styles.championIcon}
                    src = {getChampionIconUrl(4)}
                    width = {50}
                    height = {50}
                    alt = "Champion Icon"   
                    loading = "eager"
                /> */}

                <div className = {styles.championInfo}>

                    <h1 className = {styles.championName}> Test </h1>

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
                <div className = {styles.runeText}>
                    <h3>
                        Recommended Runes: {championAnalytics.highest_wr_runes.win_rate}% WR ({championAnalytics.highest_wr_runes.matches_used} Matches)
                    </h3>
                </div>
                <Runes
                    primaryRuneTree={championAnalytics.rune_trees[0]}
                    secondaryRuneTree={championAnalytics.rune_trees[1]}
                    primaryRuneSelections={[
                        championAnalytics.highest_wr_runes.primary_slot_1,
                        championAnalytics.highest_wr_runes.primary_slot_2,
                        championAnalytics.highest_wr_runes.primary_slot_3,
                        championAnalytics.highest_wr_runes.primary_slot_4,                    
                    ]}
                    secondaryRuneSelections={[
                        championAnalytics.highest_wr_runes.secondary_slot_1,
                        championAnalytics.highest_wr_runes.secondary_slot_2
                    ]}
                    statPerks={championAnalytics.highest_wr_stat_shards}
                />
            </div>

            <div className = {styles.counterContainer}>

            </div>

            <div className = {styles.buildContainer}>

            </div>
        </div>
    )
}