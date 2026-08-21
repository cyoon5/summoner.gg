'use client'

import Image from "next/image"
import styles from "./page.module.css"
import championCardImage from '../public/home-page-cards/championCardImage.jpg'
import leaderboardCardImage from '../public/home-page-cards/leaderboardCardImage.jpg'
import searchCardImage from '../public/home-page-cards/searchCardImage.webp'
import landingImage from '../public/home-page-cards/Freljord_LoR_Background.webp'
import { useRouter } from 'next/navigation'
import Navbar from "@/components/navigation/Navbar"

export default function Home(){

    const router = useRouter();



    return(
        
        <div className = {styles.contentContainer}>

            <div className ={styles.leftbar}></div>
            <div className ={styles.rightbar}></div>
            <Navbar/>


            <div className={styles.landingContainer}>

                <Image
                    className = {styles.landingImage}
                    src = {landingImage}
                    alt = "Nav Card Image"
                    priority
                />

                <div className = {styles.landingText}>
                    <p className={styles.tagline}>
                        League of Legends analytics
                    </p>
                    <span className={styles.siteName}>SUMMONER.GG</span>
                    <p className = {styles.description}>
                        Explore your stats, track your performance, and discover top League of Legends players.
                    </p>
             
                </div>
            </div>



            <span className = {styles.horizontalborder}></span>
                <div className = {styles.features}> FEATURES </div>
            <span className = {styles.horizontalborder}></span>

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
                        <p className = {styles.subText}>Search yourself or other players</p>
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
                            <p className = {styles.subCardSubText}>View the top players</p>
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
                            <p className = {styles.comingSoon}> Coming soon</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}