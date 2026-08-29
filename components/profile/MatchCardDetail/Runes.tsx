import { RunesProp } from "@/app/types/match"
import styles from "./Runes.module.css"
import Image from "next/image"
import { getRuneIconUrl, getRuneTree } from "@/app/services/dragonService"

export default function Runes(props: RunesProp){

    const primaryTree = getRuneTree(props.primaryRuneTree);
    const secondaryTree = getRuneTree(props.secondaryRuneTree);
    const primaryTreeIcon = getRuneIconUrl(props.primaryRuneTree);
    const secondaryTreeIcon = getRuneIconUrl(props.secondaryRuneTree);

    return(

        <div className = {styles.container}>

            {
                primaryTreeIcon && <div className = {styles.runeContainer}>

                    <div className = {styles.primaryTreeContainer}>
                        <Image
                            className = {styles.treeIcon}
                            src = { primaryTreeIcon }
                            width = {50}
                            height = {50}
                            alt = {"Rune Image"}
                            loading = "eager"
                        />
                    
                        {
                            primaryTree?.slots.map((slot, index) => 
                                <div className = {index === 0? styles.keystoneRow : styles.runeRow} key = {index}>
                                    {
                                        slot.runes.map(rune =>
                                            <Image
                                                className = {`
                                                    ${index === 0? styles.keystoneIcon : styles.runeIcon} 
                                                    ${props.primaryRuneSelections.includes(rune.id) && index === 0 ? styles.selectedKeystone : ""}
                                                    ${props.primaryRuneSelections.includes(rune.id) && index !== 0 ? styles.selectedRune : ""}
                                                `}
                                                key = {rune.id}
                                                src = {getRuneIconUrl(rune.id)!}
                                                width = {50}
                                                height = {50}
                                                alt = {"Rune Image"}
                                                loading = "eager"                     
                                            />
                                        )
                                    }
                                </div>
                            )
                        }
                      
                
                    </div>

                    <div className = {styles.secondaryTreeContainer}>
                        <Image
                            className = {styles.treeIcon}
                            src = { secondaryTreeIcon! }
                            width = {50}
                            height = {50}
                            alt = {"Rune Image"}
                            loading = "eager"
                        />
                    
                        {
                            secondaryTree?.slots.slice(1).map((slot, index) => 
                                <div className = {styles.runeRow} key = {index}>
                                    {
                                        slot.runes.map(rune =>
                                            <Image
                                                className = {`
                                                    ${styles.runeIcon} 
                                                    ${props.secondaryRuneSelections.includes(rune.id) ? styles.selectedRune : ""}
                                                `}                                                
                                                key = {rune.id}
                                                src = {getRuneIconUrl(rune.id)!}
                                                width = {50}
                                                height = {50}
                                                alt = {"Rune Image"}
                                                loading = "eager"                     
                                            />
                                        )
                                    }
                                </div>
                            )
                        }
                        
                        <div className = {styles.statShardContainer}>



                        </div>
                    </div>
                </div>
            }
    
        </div>
    )
}