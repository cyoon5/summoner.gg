'use client';
import { MatchCardDetailProp, ParticipantInfo } from "@/app/types/match";
import styles from "./MatchCardDetail.module.css"
import SummonerRow from "./SummonerRow";


export default function MatchCardDetail(prop: MatchCardDetailProp){





    return(

        <div className = {styles.detailsContainer}>

            <div className = {styles.detailsNavBar}>
                <div className = {styles.navBarTab}>
                    Post Game
                </div>

                <div>
                    Performance
                </div>

                <div>
                    Item Build
                </div>

                <div>
                    Metrics 
                </div>
            </div>

            <div className = {styles.summonerTeamDetails}>
                <div className = {prop.participant.win? styles.detailsHeaderVictory : styles.detailsHeaderDefeat}>
                    <p className = {styles.gameOutcome}> {prop.participant.win? "Victory": "Defeat"} ({prop.participant.team == "red"? "Red" : "Blue"} Side) </p>
                    <p> KDA </p>
                    <p> Damage </p>
                    <p> Gold </p>
                    <p> CS </p>
                    <p> Wards </p>
                    <p> Items </p>
                </div>

                {
                    prop.participants.filter((p:ParticipantInfo) => p.team == prop.participant.team).map((p:ParticipantInfo) => (
                            <SummonerRow participant = {p} searchedParticipant = {prop.participant} maxDamage = {prop.maxDamage} platform = {prop.platform} key = {p.puuid}/>
                    ))
                }
            </div>


       

            <div className = {styles.enemyTeamDetails}>
                <div className = {prop.participant.win? styles.detailsHeaderDefeat : styles.detailsHeaderVictory}>
                    <p className = {styles.gameOutcome}> {prop.participant.win? "Defeat" : "Victory"}  ({prop.participant.team == "red"? "Blue" : "Red"} Side) </p>
                    <p> KDA </p>
                    <p> Damage </p>
                    <p> Gold </p>
                    <p> CS </p>
                    <p> Wards </p>
                    <p> Items </p>
                </div>

                {
                    prop.participants.filter((p:ParticipantInfo) => p.team != prop.participant.team).map((p:ParticipantInfo) => (
                        <SummonerRow participant = {p} searchedParticipant = {prop.participant} maxDamage = {prop.maxDamage} key = {p.puuid} platform = {prop.platform}/>
                    ))
                }

            </div>
        
        </div>
    )
}