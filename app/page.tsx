'use client'

import Image from "next/image"
import styles from "./page.module.css"
import mainImage from '../public/home-page-cards/lolchamp.jpg'
import championCardImage from '../public/home-page-cards/background.webp'


export default function Home(){





    return(
        <div className = {styles.contentContainer}>

            <div className = {styles.homeNav}>
                <span className = {styles.siteName}> summoner.gg </span>
            </div>

            <div className = {styles.cardContainer}>
                
                <div className = {styles.mainCard}>
                    <Image
                        className = {styles.mainImage}
                        src = {mainImage}
                        alt = "Nav Card Image"
                        priority
                    />
                </div>

                <div className = {styles.subCardContainer}>

                    <Image
                        className = {styles.subImage}
                        src = {mainImage}
                        alt = "Nav Card Image"
                        priority
                    />

                    <Image
                        className = {styles.subImage}
                        src = {championCardImage}
                        alt = "Nav Card Image"
                        priority
                    />

                </div>
            </div>

        </div>
    )
}