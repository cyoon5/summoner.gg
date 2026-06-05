//Sole job of this file is to construct image URL to ddragon for profile icons, champions, spells, etc


async function getCurrentPatch(){
    const patch = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const patchList = await patch.json();
    return patchList[0];
}
async function getProfileIconUrl(iconId : number){
    const patch = await getCurrentPatch();
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${iconId}.png`;
}
