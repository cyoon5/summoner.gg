import { SUMMONER_SPELL_MAP } from "./constants";

//Module level call, s.t. it does not run on every function call.
const patch = await getCurrentPatch();
const runeMap = await getRuneMap(); 


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
function getItemIconUrl(iconId: number){

    if(!iconId)
        return
    
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${iconId}.png`
}

 function getSummonerSpellIconUrl(iconId: number){
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${SUMMONER_SPELL_MAP.get(iconId)}.png`
}

//Can construct a map, should cache for reduced API calls, only fetch on new patch
//Use map to construct URL s.t. its non-async
function getRuneIconUrl(runeId: number){
    
    if(!runeId)
        return;
    
    let path = runeMap.get(runeId);
    return `https://ddragon.leagueoflegends.com/cdn/img/${path}`;
}

async function getRuneMap(): Promise<Map<number, string>>{ //Key value pair of id: iconPath
    const runeMap = new Map<number, string>();
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/runesReforged.json`);
    const data = await response.json();

    data.forEach((path:any) => 
        {
            runeMap.set(path.id, path.icon);
            path.slots.forEach((r:any) => r.runes
            .forEach((rune:any) => runeMap.set(rune.id, rune.icon)));
        }
    )
    return runeMap;
}



export { getCurrentPatch, getProfileIconUrl, getChampionIconUrl, getItemIconUrl, getSummonerSpellIconUrl, getRuneIconUrl};
