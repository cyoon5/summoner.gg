import { RunesProp } from "@/app/types/match"
import styles from "./Runes.module.css"
import Image from "next/image"
import { getRuneIconUrl, getRuneTree } from "@/app/services/dragonService"
import { STAT_SHARD_MAP } from "@/app/constants";

export default function Runes(props: RunesProp){

    const primaryTree = getRuneTree(props.primaryRuneTree);
    const secondaryTree = getRuneTree(props.secondaryRuneTree);

    const primaryTreeIcon = getRuneIconUrl(props.primaryRuneTree);
    const secondaryTreeIcon = getRuneIconUrl(props.secondaryRuneTree);


    if (!primaryTree || !secondaryTree) {
        return (
            <div className={styles.container}>
                <span>Runes not available</span>
            </div>
        );
    }

    return(

        <div className = {styles.container}>
            
            <div className = {styles.runeContainer}>

                <div className = {styles.primaryRuneContainer}>

                    <div className = {styles.treeContainer}>
                        {
                            primaryTreeIcon && <Image
                                className = {styles.treeIcon}
                                src = { primaryTreeIcon }
                                width = {50}
                                height = {50}
                                alt = {"Rune Image"}
                            />
                        }
                        <span> {primaryTree.name} </span>
                    </div> 
                
                
                    {
                        primaryTree.slots.map((slot, index) => 
                            <div className = {index === 0? styles.keystoneRow : styles.runeRow} key = {index}>
                                {
                                    slot.runes.map(rune =>{
                                        const runeIcon = getRuneIconUrl(rune.id);
                                        return(
                                            runeIcon && <Image
                                                className = {`
                                                    ${index === 0? styles.keystoneIcon : styles.runeIcon} 
                                                    ${props.primaryRuneSelections.includes(rune.id) && index === 0 ? styles.selectedKeystone : ""}
                                                    ${props.primaryRuneSelections.includes(rune.id) && index !== 0 ? styles.selectedRune : ""}
                                                `}
                                                key = {rune.id}
                                                src = {runeIcon}
                                                width = {50}
                                                height = {50}
                                                alt = {"Rune Image"}
                                            />
                                        )}
                                    
                                    )
                                }
                            </div>
                        )
                    }
                    
            
                </div>

                <div className = {styles.secondaryRuneContainer}>


                    <div className = {styles.treeContainer}>
                        {
                            secondaryTreeIcon && <Image
                                className = {styles.treeIcon}
                                src = { secondaryTreeIcon }
                                width = {50}
                                height = {50}
                                alt = {"Rune Image"}
                            />
                        } 
                        <span> {secondaryTree.name} </span>
                    </div> 
            
                
                    {
                        secondaryTree.slots.slice(1).map((slot, index) => 
                            <div className = {styles.runeRow} key = {index}>
                                {
                                    slot.runes.map(rune => {
                                        const runeIcon = getRuneIconUrl(rune.id);
                                        return(
                                            runeIcon && <Image
                                                className = {`
                                                    ${styles.runeIcon} 
                                                    ${props.secondaryRuneSelections.includes(rune.id) ? styles.selectedRune : ""}
                                                `}                                                
                                                key = {rune.id}
                                                src = {runeIcon}
                                                width = {50}
                                                height = {50}
                                                alt = {"Rune Image"}
                                            />
                                        )}
                                
                                    )
                                }
                            </div>
                        )
                    }
                    
                    <div className = {styles.statShardContainer}>
                        

                            <Image
                                className = {styles.statShardIcon}
                                src={`/stat-shards/${STAT_SHARD_MAP.get(props.statPerks.offense)}.webp`}
                                width = {50}
                                height = {50}
                                alt = "Stat shard icon"
                            />
                    

             
                            <Image
                                className = {styles.statShardIcon}
                                src={`/stat-shards/${STAT_SHARD_MAP.get(props.statPerks.flex)}.webp`}
                                width = {50}
                                height = {50}
                                alt = "Stat shard icon"
                            />

    
                            <Image
                                className = {styles.statShardIcon}
                                src={`/stat-shards/${STAT_SHARD_MAP.get(props.statPerks.defense)}.webp`}
                                width = {50}
                                height = {50}
                                alt = "Stat shard icon"
                            />
                        
                    </div>

                </div>

            </div>
            
    
        </div>
    )
}