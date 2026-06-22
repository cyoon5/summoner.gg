//Sole job of this file is to construct image URL/patch to ddragon for profile icons, champions, spells, etc

import { SUMMONER_SPELL_MAP } from "./constants";


async function getCurrentPatch(){
    const patch = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const patchList = await patch.json();
    return patchList[0];
}

function getProfileIconUrl(iconId: number, patch: number){
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${iconId}.png`;
}

function getChampionIconUrl(champion: string, patch: number){
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champion}.png`;
}

function getSummonerIconUrl(spellName: string, patch: number){
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${spellName}.png`;

}

function getItemIconUrl(iconId: number, patch: number){
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${iconId}.png`
}

 function getSummonerSpellIconUrl(iconId: number, patch: number){



    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${SUMMONER_SPELL_MAP.get(iconId)}.png`
}



export { getCurrentPatch, getProfileIconUrl, getChampionIconUrl, getItemIconUrl, getSummonerIconUrl , getSummonerSpellIconUrl};
