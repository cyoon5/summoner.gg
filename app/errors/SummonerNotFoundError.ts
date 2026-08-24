export class SummonerNotFoundError extends Error {
    constructor(){
        super("Summoner not found");
    }
}