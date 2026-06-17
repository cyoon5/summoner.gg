import { SearchInput } from "@/app/types/summoner";

//Parses input and validates format of search inpuut of summoner.
export default function parseSummoner(input: string) : null | SearchInput {

    const cleanedInput = input.trim();
    const parts = cleanedInput.split("#");

    if(parts.length != 2)
        return null;
    
    const gameName = parts[0];
    const tagLine = parts[1];

    if(!gameName || !tagLine)
        return null;
    
    return {
            gameName: gameName, 
            tagLine: tagLine,
           };
}