

export default async function Profile({ params }: {params: Promise<{summoner: string}>}) {
//search -> profile -> api call -> display
    
    const userInfo = await params;
    const [gameName, tagLine] = userInfo.summoner.split("-");
    const response = await fetch(`http://localhost:3000/api/riot?gameName=${gameName}&tagLine=${tagLine}`);
    const data = await response.json(); //convert response stream into usable JavaScript object
    const iconId = data.profileIconId;
    const link = `https://ddragon.leagueoflegends.com/cdn/16.10.1/img/profileicon/${iconId}.png`;
    
    return(
        <>
            
            <img src = {link}></img>
        </>
    )
}