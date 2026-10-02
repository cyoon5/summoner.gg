import Image from "next/image"
import styles from "./page.module.css"
import { getChampionIconUrl } from "@/app/services/dragonService"
import { getChampionAnalytics } from "@/app/services/championService";
import Runes from "@/components/profile/MatchCardDetail/Runes";

export default async function Champion({ params }: {params: Promise<{champion: string}>}){
    
    const champion = (await params).champion;
    const championAnalytics = await getChampionAnalytics(champion);
    
    return(
        <div className = {styles.container}>

            <div className = {styles.championContainer}>

                 <Image
                    className = {styles.championIcon}
                    src = {getChampionIconUrl(championAnalytics.champion_key)}
                    width = {50}
                    height = {50}
                    alt = "Champion Icon"   
                    loading = "eager"
                /> 

                <div className = {styles.championInfo}>

                    <h1 className = {styles.championName}> {champion} </h1>

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
                <div className = {styles.runePageInformation}>
                    <h3 className = {styles.recommendedRunes}> Recommended Runes </h3>
                    <span>{championAnalytics.highest_wr_runes.win_rate}% WR ({championAnalytics.highest_wr_runes.matches_used} Matches)</span>
                </div>
                <Runes
                    primaryRuneTree={championAnalytics.primary_rune_tree}
                    secondaryRuneTree={championAnalytics.secondary_rune_tree}
                    primaryRuneSelections={[
                        championAnalytics.highest_wr_runes.primary_slot_1,
                        championAnalytics.highest_wr_runes.primary_slot_2,
                        championAnalytics.highest_wr_runes.primary_slot_3,
                        championAnalytics.highest_wr_runes.primary_slot_4              
                    ]}
                    secondaryRuneSelections={[
                        championAnalytics.highest_wr_runes.secondary_slot_1,
                        championAnalytics.highest_wr_runes.secondary_slot_2
                    ]}
                    statPerks={championAnalytics.highest_wr_stat_shards}
                />
            </div>

            <div className = {styles.summonerSpellContainer}>

            </div>

            <div className = {styles.counterPickContainer}>

            </div>

            <div className = {styles.buildContainer}>

            </div>
        </div>
    )
}