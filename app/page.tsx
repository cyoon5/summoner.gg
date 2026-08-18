'use client'

import Image from "next/image"
import styles from "./page.module.css"
import championCardImage from '../public/home-page-cards/championCardImage.jpg'
import leaderboardCardImage from '../public/home-page-cards/leaderboardCardImage.jpg'
import searchCardImage from '../public/home-page-cards/searchCardImage.webp'
import { useRouter } from 'next/navigation'

export default function Home(){

    const router = useRouter();



    return(
        <div className = {styles.contentContainer}>

            <div className = {styles.homeNav}>
                <span className = {styles.siteName}> summoner.gg </span>
            </div>

            <div className = {styles.cardContainer}>
                
                <div className = {styles.searchCardWrapper} onClick={() => router.push(`/search`)}>
                    <Image
                        className = {styles.mainImage}
                        src = {searchCardImage}
                        alt = "Nav Card Image"
                        priority
                    />

                    <div className = {styles.searchCardText}>
                        Summoners
                        <p className = {styles.subText}>Search players</p>
                    </div>
                </div>

                <div className = {styles.subCardContainer}>

                    <div className = {styles.leaderboardCardWrapper} onClick={() => router.push(`/leaderboards`)}>
                        <Image
                            className = {styles.subImage}
                            src = {leaderboardCardImage}
                            alt = "Nav Card Image"
                            priority
                        />
                        <div className = {styles.leaderboardCardText}>
                            Leaderboards
                            <p className = {styles.subCardSubText}>View the top summoners</p>
                        </div>
                    </div>


                    <div className = {styles.championCardWrapper}>
                        <Image
                            className = {styles.subImage}
                            src = {championCardImage}
                            alt = "Nav Card Image"
                            priority
                        />
                        <div className = {styles.championCardText}>
                            Champions
                            <p className = {styles.comingSoon}> Coming Soon</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}