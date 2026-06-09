//Sole job of this file is to construct image URL to ddragon for profile icons, champions, spells, etc


async function getCurrentPatch(){
    const patch = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const patchList = await patch.json();
    return patchList[0];
}





function getProfileIconUrl(iconId: number, patch: string){
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${iconId}.png`;
}

function getChampionIconUrl(champion: string, patch: string){
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champion}.png`;
}






export { getCurrentPatch, getProfileIconUrl, getChampionIconUrl };
