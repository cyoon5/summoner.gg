'use client'


import Link from "next/link"
import styles from "./Navbar.module.css"

export default function Navbar(){

    const patchNotes = `https://www.leagueoflegends.com/en-us/news/game-updates/league-of-legends-patch-26-16-notes/`


    return (
        <div className = {styles.navigationContainer}>

            <div> 
                <Link className = {styles.link} href = '/'>SUMMONER.GG</Link>
            </div>
        
            <div className = {styles.linkContainer}>
                <Link className = {styles.link} href = '/leaderboards'>LEADERBOARDS</Link>
                <Link className = {styles.link} href = '/search'>SUMMONERS</Link>
                <Link className = {styles.link} href = '/search'>CHAMPIONS</Link>
                <Link className = {styles.link} href = '/search'>PATCH NOTES</Link>
                ABOUT

            </div>
        
       </div> 
    )
}