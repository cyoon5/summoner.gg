'use client';
import { MatchCardDetailProp, ParticipantInfo } from "@/app/types/match";
import styles from "./MatchCardDetail.module.css"
import SummonerRow from "./SummonerRow";
import { Fragment } from "react/jsx-runtime";


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
                    <p> {prop.participant.win? "Victory": "Defeat"} ({prop.participant.team == "red"? "Red" : "Blue"} Team) </p>
                    <p> KDA </p>
                    <p> Damage </p>
                    <p> Gold </p>
                    <p> CS </p>
                    <p> Wards </p>
                    <p> Items </p>
                </div>

                {
                    prop.participants.filter((p:ParticipantInfo) => p.team == prop.participant.team).map((p:ParticipantInfo) => (
                            <SummonerRow participant = {p} searchedParticipant = {prop.participant} key = {p.puuid}/>
                    ))
                }
            </div>


       

            <div className = {styles.enemyTeamDetails}>
                <div className = {prop.participant.win? styles.detailsHeaderDefeat : styles.detailsHeaderVictory}>
                    <p> {prop.participant.win? "Defeat" : "Victory"}  ({prop.participant.team == "red"? "Blue" : "Red"} Team) </p>
                    <p> KDA </p>
                    <p> Damage </p>
                    <p> Gold </p>
                    <p> CS </p>
                    <p> Wards </p>
                    <p> Items </p>
                </div>

                {
                    prop.participants.filter((p:ParticipantInfo) => p.team != prop.participant.team).map((p:ParticipantInfo) => (
                        <SummonerRow participant = {p} searchedParticipant = {prop.participant} key = {p.puuid}/>
                    ))
                }

            </div>
        
        </div>
    )
}