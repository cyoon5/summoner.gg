import Image from "next/image"
import styles from "./page.module.css"
import { getChampionIconUrl, getSummonerSpellIconUrl } from "@/app/services/dragonService"
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

            <div className = {styles.recommendationContainer}>
                <div className = {styles.runeContainer}>
                    <div className = {styles.runePageInformation}>
                        <h3> Recommended Runes</h3>
                        <span className = {styles.rate}>
                            <h4 className = {styles.rateText}>
                                {championAnalytics.recommended_runes.win_rate}% WR
                            </h4> 
                             &nbsp;({championAnalytics.recommended_runes.matches_used} Matches)
                        </span>
                    </div>
                    <Runes
                        primaryRuneTree={championAnalytics.primary_rune_tree}
                        secondaryRuneTree={championAnalytics.secondary_rune_tree}
                        primaryRuneSelections={[
                            championAnalytics.recommended_runes.primary_slot_1,
                            championAnalytics.recommended_runes.primary_slot_2,
                            championAnalytics.recommended_runes.primary_slot_3,
                            championAnalytics.recommended_runes.primary_slot_4              
                        ]}
                        secondaryRuneSelections={[
                            championAnalytics.recommended_runes.secondary_slot_1,
                            championAnalytics.recommended_runes.secondary_slot_2
                        ]}
                        statPerks={championAnalytics.highest_wr_stat_shards}
                    />
                </div>
                <div className = {styles.summonerSpellContainer}>
                    <h4>Recommended <br/> Summoner Spells</h4>
                        {championAnalytics.recommended_spells.win_rate}% Win Rate
                        <br/>
                        ({championAnalytics.recommended_spells.matches_used} Matches)

                    <div className = {styles.summonerSpellIconContainer}>
                        {
                            championAnalytics.recommended_spells.summoner_spell_1 && <Image
                                src = {getSummonerSpellIconUrl(championAnalytics.recommended_spells.summoner_spell_1)!}
                                alt = "Summoner Spell Icon"
                                width = {50}
                                height = {50}
                                className = {styles.spell}
                            />
                        }
                        {
                            championAnalytics.recommended_spells.summoner_spell_2 && <Image
                                src = {getSummonerSpellIconUrl(championAnalytics.recommended_spells.summoner_spell_2)!}
                                alt = "Summoner Spell Icon"
                                width = {50}
                                height = {50}
                                className = {styles.spell}
                            />
                        }
                    </div>
                </div>

            </div>


            <div className = {styles.counterPickContainer}>

            </div>

            <div className = {styles.buildContainer}>

            </div>
        </div>
    )
}