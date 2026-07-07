'use client'
import { SummonerRowProp, ParticipantInfo } from "@/app/types/match"
import styles from "./SummonerRow.module.css"
import Image from "next/image"

export default function SummonerRow(prop: SummonerRowProp){



    return(
        <div className = {styles.summonerContainer}>
            
            <div className = {styles.summoner}>

                <Image
                    src = {prop.participant.championUrl}
                    width = "60"
                    height = "60"
                    className = {styles.championIcon}
                    alt = "Champion Icon"
                />

                <div className = {styles.spellContainer}>
                    <Image
                        src = {prop.participant.summonerSpell1Url}
                        className = {styles.summonerSpell}
                        width={500}
                        height={500}
                        alt= "Spell Image"
                    />
                    <Image
                        src = {prop.participant.summonerSpell2Url}
                        className = {styles.summonerSpell}
                        width={500}
                        height={500}
                        alt= "Spell Image"
                    />
                </div>

                <div className = {styles.runeContainer}>
                    <div className = {styles.runeSlot}>
                        <Image
                            src = {prop.participant.keystoneUrl}
                            className = {styles.rune}
                            width={500}
                            height={500}
                            alt= "Rune Image"
                        />
                    </div>
                    <div className = {styles.runeSlot}>
                        <Image
                            src = {prop.participant.secondaryRuneTreeUrl}
                            className = {styles.secondaryRuneTree}
                            width={500}
                            height={500}
                            alt= "Rune Image"
                        />
                    </div>

                </div>

                <div className = {styles.nameAndRank}>

                    <span>{prop.participant.gameName}</span>

                    <div className = {styles.rank}>
                           <Image
                            src = "https://ddragon.leagueoflegends.com/cdn/16.13.1/img/champion/Aatrox.png"
                            className = {styles.miniRankedEmblem}
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
                <span> {prop.participant.kda} </span>
            </div>

            <div className = {styles.damage}>
                {prop.participant.damageDealt}
            </div>

            <div className = {styles.gold}>
                {prop.participant.totalGoldEarned}
            </div>

            <div className = {styles.creepScore}> 
                {prop.participant.creepScore}
            </div>  
        
            <div className = {styles.wards}>
                {prop.participant.visionScore}
            </div>

            <div className = {styles.itemContainer}>
                {
                    prop.participant.itemUrls.map((item:string, i) => (
                        
                        <div className = {styles.itemSlot} key = {i}>

                        {
                            item && <Image
                            className = {styles.item}
                            src = {item}
                            width={500}
                            height={500}
                            alt= "Item Image"
                            />
                        }
                    </div>
                    ))
                }
            </div>
        
        </div>
    )
}