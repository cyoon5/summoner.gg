import { SUMMONER_SPELL_MAP } from "../constants";
import { Rune, RuneSlot, RuneTree, RuneTrees } from "../types/runes";

const patch = await getCurrentPatch();
const runeData = await getRuneData();
const runeMap = getRuneMap(); 

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
    if(iconId === 3097) //Stormrazer
        iconId = 3095;
    
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${iconId}.png`
}

 function getSummonerSpellIconUrl(iconId: number){
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${SUMMONER_SPELL_MAP.get(iconId)}.png`
}

function getRuneIconUrl(runeId: number): string | undefined {

    if(!runeId)
        return;
    
    let path = runeMap.get(runeId);

    if(!path)
        return;

    return `https://ddragon.leagueoflegends.com/cdn/img/${path}`;
}

async function getRuneData(): Promise<RuneTree[]>{
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/runesReforged.json`);
    return await response.json();
}

function getRuneMap(): Map<number, string> { 
    const runeMap = new Map<number, string>();

    runeData.forEach((path:RuneTree) => {
            runeMap.set(path.id, path.icon);
            path.slots.forEach((r:RuneSlot) => r.runes
            .forEach((rune:Rune) => runeMap.set(rune.id, rune.icon)));
        }
    )
    return runeMap;
}

function getRuneTrees(primaryRuneTreeId: number, secondaryRuneTreeId: number) : RuneTrees {

    const primaryTree = runeData.find((r:RuneTree) => r.id === primaryRuneTreeId);
    const secondaryTree = runeData.find((r:RuneTree) => r.id === secondaryRuneTreeId);

    return {
        primaryTree,
        secondaryTree
    }
}


export { getCurrentPatch, getProfileIconUrl, getChampionIconUrl, getItemIconUrl, getSummonerSpellIconUrl, getRuneIconUrl, getRuneTrees};
