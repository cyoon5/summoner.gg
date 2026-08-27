import { PerformanceRowProp } from "@/app/types/match"
import styles from "./PerformanceRow.module.css"
import Image from "next/image"
import { getChampionIconUrl } from "@/app/services/dragonService"
import formatRank from "@/lib/formatRankPreview";



export default function PerformanceRow(props: PerformanceRowProp){

    const kda = props.participant.deaths === 0 ? Infinity : (props.participant.kills + props.participant.assists) / props.participant.deaths;
    const damageWidth = (props.participant.damageDealt / props.maxDamage) * 100;

    return(
        
        <div className = { `${styles.container} ${props.participant.team === "blue"? styles.blueTeam : styles.redTeam}` }>

            <div className = {styles.playerContainer}>
                <Image
                    src = {getChampionIconUrl(props.participant.championName)}
                    width = {50}
                    height = {50}
                    className = {styles.championIcon}
                    alt = "Champion Icon"
                />            

                <div className ={styles.nameAndRank}>
                    {props.participant.gameName}
                    <div className = {styles.rank}>
                            
                        <Image
                            src = {`/mini-emblems/${props.rank? props.rank.tier.toLowerCase() : "unranked"}.svg`}
                            className = {styles.miniRankedEmblem}
                            width={500}
                            height={500}
                            alt= "Rank Mini Crest"
                        />

                        <span>{props.rank ? `${formatRank(props.rank.tier, props.rank.division, props.rank.leaguePoints)}` : '-'}</span>

                    </div>

                </div>

            </div>

            <div className = {styles.statColumn}>
                {props.participant.kills}
            </div>

            <div className = {styles.statColumn}>
                {kda === Infinity ? "Perfect" : kda.toFixed(2)}
            </div>

            <div className = {styles.statColumn}>
             <div className = {styles.damage}>
                    <span>{props.participant.damageDealt.toLocaleString()}</span>

                    <div className = {styles.damageBarContainer}>
                        <div className = {styles.damageBar} style={{ width: `${damageWidth}%` }}></div>
                    </div>
                </div>
            </div>

            <div className = {styles.statColumn}>
                <span>{props.participant.totalGoldEarned.toLocaleString()}</span>
            </div>

            <div className = {styles.statColumn}>
                {props.participant.creepScore}
            </div>

            <div className = {styles.statColumn}>
                {props.participant.visionScore}
            </div>
        
        </div>
    )
}