'use client'
import styles from "./SummonerRow.module.css"
import Image from "next/image"

export default function SummonerRow(){



    return(
        <div className = {styles.summonerContainer}>
            
            <div className = {styles.summoner}>

                <Image
                    src = "https://ddragon.leagueoflegends.com/cdn/16.13.1/img/champion/Aatrox.png"
                    width = "60"
                    height = "60"
                    className = {styles.championIcon}
                    alt = "mockImg"
                />

                <div className = {styles.spellContainer}>
                    <Image
                        src = "https://ddragon.leagueoflegends.com/cdn/16.13.1/img/champion/Aatrox.png"
                        className = {styles.summonerSpell}
                        width={500}
                        height={500}
                        alt= "Spell Image"
                    />
                    <Image
                        src = "https://ddragon.leagueoflegends.com/cdn/16.13.1/img/champion/Aatrox.png"
                        className = {styles.summonerSpell}
                        width={500}
                        height={500}
                        alt= "Spell Image"
                    />
                </div>

                <div className = {styles.runeContainer}>
                    <div className = {styles.runeSlot}>
                        <Image
                            src = "https://ddragon.leagueoflegends.com/cdn/16.13.1/img/champion/Aatrox.png"
                            className = {styles.rune}
                            width={500}
                            height={500}
                            alt= "Rune Image"
                            loading= "eager"
                        />
                    </div>
                    <div className = {styles.runeSlot}>
                        <Image
                            src = "https://ddragon.leagueoflegends.com/cdn/16.13.1/img/champion/Aatrox.png"
                            className = {styles.secondaryRuneTree}
                            width={500}
                            height={500}
                            alt= "Rune Image"
                            loading= "eager"
                        />
                    </div>

                </div>

                <div className = {styles.nameAndRank}>

                    <span>lorem ipsum</span>

                    <div className = {styles.rank}>
                           <Image
                            src = "https://ddragon.leagueoflegends.com/cdn/16.13.1/img/champion/Aatrox.png"
                            className = {styles.secondaryRuneTree}
                            width={500}
                            height={500}
                            alt= "Rune Image"
                            loading= "eager"
                        />
                        <span> D4 </span>
                    </div>
                </div>


            </div>

            <div className = {styles.kda}>
                <span>1 / 1 / 1</span>
            </div>

            <div className = {styles.damage}>
                21.2k
            </div>

            <div className = {styles.gold}>
                13k
            </div>

            <div className = {styles.creepScore}> 
                230
            </div>  
        
            <div className = {styles.wards}>
                13
            </div>

            <div className = {styles.itemContainer}>

            </div>
        
        </div>
    )
}