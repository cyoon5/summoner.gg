'use client';
import { MatchCardDetailProp, ParticipantInfo } from "@/app/types/match";
import styles from "./MatchCardDetail.module.css"
import SummonerRow from "./SummonerRow";


export default function MatchCardDetail(prop: MatchCardDetailProp){





    return(

        <div className = {styles.detailsContainer}>

            <div className = {styles.detailsNavBar}>

            </div>

            <div className = {styles.teamRedDetails}>

                <div className = {styles.detailsHeaderRed}>
                    <p> Red Team</p>
                    <p> KDA </p>
                    <p> Damage </p>
                    <p> Gold </p>
                    <p> CS </p>
                    <p> Wards </p>
                    <p> Items </p>
                </div>

                {
                    prop.participants.filter((p:ParticipantInfo) => p.team == "red").map((p:ParticipantInfo) => (
                        <SummonerRow participant = {p} key = {p.puuid}/>
                    ))
                }
            </div>


       

            <div className = {styles.teamBlueDetails}>
                <div className = {styles.detailsHeaderBlue}>
                    <p> Blue Team</p>
                    <p> KDA </p>
                    <p> Damage </p>
                    <p> Gold </p>
                    <p> CS </p>
                    <p> Wards </p>
                    <p> Items </p>
                </div>

                {
                    prop.participants.filter((p:ParticipantInfo) => p.team == "blue").map((p:ParticipantInfo) => (
                        <SummonerRow participant = {p} key = {p.puuid}/>
                    ))
                }

            </div>
        
        </div>
    )
}