
export type SummonerData = {
    region: string;
    gameName: string;
    tagLine: string;
};

export type SearchInput = {
  gameName: string;
  tagLine: string;
};

export type SummonerProfile = {
  puuid: string;
  gameName: string;
  tagLine: string;
  platform: string;
  routing: string;
  accountLvl: number;
  iconURL: string;
}