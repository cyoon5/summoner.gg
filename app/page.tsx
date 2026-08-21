'use client'

import Image from "next/image"
import styles from "./page.module.css"
import championCardImage from '../public/home-page-cards/championCardImage.jpg'
import leaderboardCardImage from '../public/home-page-cards/leaderboardCardImage.jpg'
import searchCardImage from '../public/home-page-cards/searchCardImage.webp'
import landingImage from '../public/home-page-cards/LoR.png'
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
                <div className = {styles.features} id = "features"> FEATURES </div>
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


            <span className = {styles.horizontalborder}></span>
                <div className = {styles.about} id="about"> ABOUT </div>
            <span className = {styles.horizontalborder}></span>


            <div className = {styles.aboutContainer}>

                <div className={styles.aboutIntro}>
                    <h2>What is Summoner.gg?</h2>
                    <p>
                        Summoner.gg is a League of Legends analytics platform inspired by
                        existing tools like U.GG and OP.GG. I wanted to build my own take
                        on a player analytics platform while learning full-stack
                        development, API integration, and working with real game data.
                    </p>
                </div>

                <div className={styles.howItWorks}>
                    <h2>How does it work?</h2>
                    <p>
                        Summoner.gg uses the Riot Games API to retrieve League of Legends data and turn it into useful insights.
                        Search for a summoner to view their profile, recent matches, and performance statistics,
                        or explore leaderboards to see top players across different regions and queues. 
                    </p>

                </div>

                <div className={styles.apiSection}>
                    <h2>Riot Games API</h2>

                    <p>
                        Summoner.gg uses Riot Games APIs to retrieve and organize player,
                        ranked, and match data.
                    </p>

                    <div className={styles.apiList}>

                        <div>
                            <span className = {styles.apiEndpoint}>Account-V1</span>
                            <span>Riot ID & account information</span>
                        </div>

                        <div>
                            <span className = {styles.apiEndpoint}>Summoner-V4</span>
                            <span>Summoner information</span>
                        </div>

                        <div>
                            <span className = {styles.apiEndpoint}>Match-V5</span>
                            <span>Match history & match data</span>
                        </div>

                        <div>
                            <span className = {styles.apiEndpoint}>League-V4</span>
                            <span>Ranked & leaderboard data</span>
                        </div>

                    </div>
                </div>

                <div className={styles.stackSection}>

                    <h2>Built With</h2>
                    <p>
                        Next.js · React · TypeScript · CSS · Riot Games API
                    </p>

                </div>


            </div>
            
            <span className = {styles.endinghorizontalborder}></span>

        </div>
    )
}