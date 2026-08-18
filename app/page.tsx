'use client'

import Image from "next/image"
import styles from "./page.module.css"
import championCardImage from '../public/home-page-cards/championCardImage.jpg'
import leaderboardCardImage from '../public/home-page-cards/leaderboardCardImage.jpg'
import test from '../public/home-page-cards/worlds-2024-viego-splash-art-v0-um4wons34tnd1.webp'
import { useRouter } from 'next/navigation'

export default function Home(){

    const router = useRouter();



    return(
        <div className = {styles.contentContainer}>

            <div className = {styles.homeNav}>
                <span className = {styles.siteName}> summoner.gg </span>
            </div>

            <div className = {styles.cardContainer}>
                
                <div className = {styles.mainCardWrapper} onClick={() => router.push(`/search`)}>
                    <Image
                        className = {styles.mainImage}
                        src = {test}
                        alt = "Nav Card Image"
                        priority
                    />

                    <div className = {styles.mainCardText}>
                        Summoners
                        <p className = {styles.subText}>Search players</p>
                    </div>
                </div>

                <div className = {styles.subCardContainer}>

                    <div className = {styles.subCardWrapper1} onClick={() => router.push(`/leaderboards`)}>
                        <Image
                            className = {styles.subImage}
                            src = {leaderboardCardImage}
                            alt = "Nav Card Image"
                            priority
                        />
                        <div className = {styles.subCardText1}>
                            Leaderboards
                            <p className = {styles.subCardSubText}>View the top summoners</p>
                        </div>
                    </div>


                    <div className = {styles.subCardWrapper2}>
                        <Image
                            className = {styles.subImage}
                            src = {championCardImage}
                            alt = "Nav Card Image"
                            priority
                        />
                        <div className = {styles.subCardText2}>
                            Champions
                            <p className = {styles.comingSoon}> Coming Soon</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}