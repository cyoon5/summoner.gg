import { getLeaderboard } from "@/app/services/leaderboardService"

export default async function Leaderboard(){

    const initSummoners = await getLeaderboard("na1", "RANKED_SOLO_5x5", 0, 10);


    return(
        <>
            {
                initSummoners.map((s) => {
                    return <p key ={s.puuid}>{s.gameName}</p>
                })
            }
        </>
    )
}