'use client'

import Link from "next/link"
import styles from "./Navbar.module.css"

export default function Navbar(){



    return (

    <div className = {styles.container}> 
        <div className = {styles.navigationContainer}>

            <div className = {styles.home}> 
                <Link className = {styles.link} href = '/'>SUMMONER.GG</Link>
            </div>
        
            <div className = {styles.linkContainer}>
                <Link className = {styles.link} href = '/leaderboards'>LEADERBOARDS</Link>
                <Link className = {styles.link} href = '/search'>SUMMONERS</Link>
                <Link className = {styles.link} href = '/#features'>FEATURES</Link>
                <Link className = {styles.link} href = '/#about'>ABOUT</Link>

            </div>

            <Link className = {styles.github} href = 'https://github.com/cyoon5/summoner.gg' target ='_blank'>GitHub</Link>
       </div> 

        <div className = {styles.horizontalborder}></div>

    </div>
    )
}