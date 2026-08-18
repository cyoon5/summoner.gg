
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
  accountRouting: string;
  matchRouting: string;
  accountLvl: number;
  iconURL: string;
}