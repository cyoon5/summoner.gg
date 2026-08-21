'use client'


import Link from "next/link"
import styles from "./Navbar.module.css"
import Image from "next/image";

export default function Navbar(){

    const patchNotes = `https://www.leagueoflegends.com/en-us/news/game-updates/league-of-legends-patch-26-16-notes/`


    return (

    <div className = {styles.container}> 
        <div className = {styles.navigationContainer}>

            <div className = {styles.home}> 
                <Link className = {styles.link} href = '/'>SUMMONER.GG</Link>
            </div>
        
            <div className = {styles.linkContainer}>
                <Link className = {styles.link} href = '/leaderboards'>LEADERBOARDS</Link>
                <Link className = {styles.link} href = '/search'>SUMMONERS</Link>
                <Link className = {styles.link} href = '/search'>ABOUT</Link>
            </div>

            <div className = {styles.github}> 
               <Link className = {styles.link} href = 'https://github.com/cyoon5/summoner.gg' target ='_blank'>Github</Link>
            </div>
       </div> 

        <div className = {styles.horizontalborder}></div>

    </div>
    )
}