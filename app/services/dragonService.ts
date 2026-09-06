import { Rune, RuneSlot, RuneTree } from "../types/runes";

const patch = await getCurrentPatch();
const runeData = await getRuneData();
const runeMap = getRuneMap(); 
const spellMap = await getSpellMap();


//https://ddragon.leagueoflegends.com/cdn/16.15.1/data/en_US/summoner.json
//https://ddragon.leagueoflegends.com/cdn/16.15.1/data/en_US/item.json
//https://ddragon.leagueoflegends.com/cdn/16.17.1/data/en_US/champion.json
//https://ddragon.leagueoflegends.com/cdn/16.15.1/data/en_US/runesReforged.json


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

 function getSummonerSpellIconUrl(spellKey: number){
    return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${spellMap.get(spellKey)}.png`
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

function getRuneTree(runeTreeId: number) : RuneTree | undefined{

    const runeTree = runeData.find((r:RuneTree) => r.id === runeTreeId);
    return runeTree;
}

async function getSpellMap(){
    const spellMap = new Map<number, string>();
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/summoner.json`);
    const spellData = await response.json();

    Object.entries(spellData.data).map(([_, value] : [any, any]) =>
        spellMap.set(Number(value.key), value.id)
    );


    return spellMap;
}

export { getCurrentPatch, getProfileIconUrl, getChampionIconUrl, getItemIconUrl, getSummonerSpellIconUrl, getRuneIconUrl, getRuneTree};
