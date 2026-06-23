import { SUMMONER_SPELL_MAP } from "./constants";

//Module level call, s.t. it does not run on every function call.
const runeMap = getRuneMap(); 
const patch = await getCurrentPatch();




async function getCurrentPatch(){
    const patch = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const patchList = await patch.json();
    return patchList[0];
}

function getProfileIconUrl(iconId: number){
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${iconId}.png`;
}

function getChampionIconUrl(champion: string){

    if(champion == 'FiddleSticks')
        champion = 'Fiddlesticks';

    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champion}.png`;
}

function getSummonerIconUrl(spellName: string){
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${spellName}.png`;
}

function getItemIconUrl(iconId: number){
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${iconId}.png`
}

 function getSummonerSpellIconUrl(iconId: number){
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${SUMMONER_SPELL_MAP.get(iconId)}.png`
}

//Can construct a map, should cache for reduced API calls, only fetch on new patch
//Use map to construct URL s.t. its non-async
function getRuneIconUrl(runeId: number){

}

async function getRuneMap(){
    let runeData = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/runesReforged.json`);
    

}



export { getCurrentPatch, getProfileIconUrl, getChampionIconUrl, getItemIconUrl, getSummonerIconUrl , getSummonerSpellIconUrl};
