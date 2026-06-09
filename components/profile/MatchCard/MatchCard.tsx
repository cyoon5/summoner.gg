'use client'

import Image from 'next/image'
import styles from "./MatchCard.module.css"


export default function MatchCard(props: any){

    const mock = "https://ddragon.leagueoflegends.com/cdn/16.11.1/img/champion/Riven.png"

    return(
        <>
            <div className ={styles.matchBox}>
                <div className = {styles.contentBox}>

                        <div className = {styles.box1}> 
                            <b> Ranked Solo </b>
                            <p> 14 hours ago</p>
                            <p className = {styles.gameResult}> WIN 47.19</p>
                        </div>

                        <div className = {styles.box2}>
                            <div className = {styles.champion}>
                                <img src = {mock} className={styles.championIcon}></img>
                            </div>

                            <div className = {styles.summonerBox}>
                                <img className = {styles.rune} src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                <img className = {styles.summonerSpell} src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                            </div>

                            <div className  = {styles.runeBox}>
                                <img className = {styles.rune} src = "https://pbs.twimg.com/media/Ggt9Pf4XkAAmPNw.jpg"></img>
                                <img className = {styles.rune} src = "https://pbs.twimg.com/media/Ggt9Pf4XkAAmPNw.jpg"></img>

                            </div>
                        </div>

                        <div className = {styles.box3}> 
                            <p className = {styles.kdaTotal}>26 / 8 / 15</p>
                            <p className = {styles.kdaRatio}>5.13 KDA</p>
                            <p className = {styles.cs}>376 CS</p>
                            <p className = {styles.vision}>52 Vision</p>
                        </div>

                        <div className = {styles.box4}> 
                                <img className = {styles.rune} src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                <img className = {styles.rune} src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                <img className = {styles.rune} src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                <img className = {styles.rune} src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                <img className = {styles.rune} src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                <img className = {styles.rune} src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                <img className = {styles.rune} src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                <img className = {styles.rune} src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                        </div>

                        <div className = {styles.box5}>

                            <div className = {styles.teamList}>

                                <div className = {styles.summonerEntry}>

                                    <img className = {styles.champIcon}src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                    <div className = {styles.summonerName}>
                                        team1
                                    </div>
                                </div>

                                <div className = {styles.summonerEntry}>

                                    <img className = {styles.champIcon}src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                    <div className = {styles.summonerName}>
                                        team1
                                    </div>
                                </div>
                            
                                                
                                                
                                <div className = {styles.summonerEntry}>

                                    <img className = {styles.champIcon}src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                    <div className = {styles.summonerName}>
                                        team1
                                    </div>
                                </div>                   
                                
                                 <div className = {styles.summonerEntry}>

                                    <img className = {styles.champIcon}src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                    <div className = {styles.summonerName}>
                                        team1
                                    </div>
                                </div>                    
                                
                                <div className = {styles.summonerEntry}>

                                    <img className = {styles.champIcon}src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                    <div className = {styles.summonerName}>
                                        team1
                                    </div>
                                </div>

                            </div>

                            <div className = {styles.teamList}>

                                <div className = {styles.summonerEntry}>

                                    <img className = {styles.champIcon}src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                    <div className = {styles.summonerName}>
                                        team2
                                    </div>
                                </div>

                                <div className = {styles.summonerEntry}>

                                    <img className = {styles.champIcon}src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                    <div className = {styles.summonerName}>
                                        team2
                                    </div>
                                </div>     
                                
                                <div className = {styles.summonerEntry}>

                                    <img className = {styles.champIcon}src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                    <div className = {styles.summonerName}>
                                        team2
                                    </div>
                                </div>     
                                
                                <div className = {styles.summonerEntry}>

                                    <img className = {styles.champIcon}src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                    <div className = {styles.summonerName}>
                                        team2
                                    </div>
                                </div>     
                                
                                <div className = {styles.summonerEntry}>

                                    <img className = {styles.champIcon}src = "https://i.pinimg.com/564x/58/12/00/5812006cb941167209f1301920dc18e4.jpg"></img>
                                    <div className = {styles.summonerName}>
                                        team2
                                    </div>
                                </div>
                            </div>
                        </div>

    
               
                </div>
            </div>      
        </>
    )
}