export const REGION_MAPPING = new Map<string, string>([

  ["na1", "americas"],
  ["br1", "americas"],
  ["la1", "americas"],
  ["la2", "americas"],

  ["euw1", "europe"],
  ["eun1", "europe"],

  ["kr", "asia"],
  ["jp1", "asia"],

  ["oc1", "sea"],

]);

export const SUMMONER_SPELL_MAP = new Map<number, string>([

  [1, "SummonerBoost"], // Cleanse
  [3, "SummonerExhaust"],
  [4, "SummonerFlash"],
  [6, "SummonerHaste"], // Ghost
  [7, "SummonerHeal"],
  [11, "SummonerSmite"],
  [12, "SummonerTeleport"],
  [13, "SummonerMana"], // Clarity
  [14, "SummonerDot"], // Ignite
  [21, "SummonerBarrier"],

  [30, "SummonerPoroRecall"],

  [31, "SummonerPoroThrow"],

  [32, "SummonerSnowURFSnowball_Mark"],

  [39, "SummonerSnowball"],

  [55, "SummonerSmite"],

  [54, "Summoner_UltBookPlaceholder"],

  [64, "Summoner_UltBookSmitePlaceholder"],

  [2202, "SummonerCherryFlash"],

  [2201, "SummonerCherryHold"]

]);

export const QUEUE_MAP = new Map<number, string>([

  // https://static.developer.riotgames.com/docs/lol/queues.json
 
  [0, "Custom"],
  
  [400, "Normal Draft"],
  [430, "Normal Blind"],
  [490, "Quickplay"],

  [420, "Ranked Solo/Duo"],
  [440, "Ranked Flex"],
  [710, "Ranked 5S"],

  [450, "ARAM"],

  [700, "Clash (SR)"],
  [720, "Clash (ARAM)"],

  [830, "Co-op vs AI (Intro)"],
  [840, "Co-op vs AI (Beginner)"],
  [850, "Co-op vs AI (Intermediate)"],

  [870, "Co-op vs AI (Intro)"],
  [880, "Co-op vs AI (Beginner)"],
  [890, "Co-op vs AI (Intermediate)"],

  [900, "ARURF"],
  [1010, "Snow URF"],

  [1020, "One for All"],

  [1400, "Ultimate Spellbook"],

  [1700, "Arena"],
  [1710, "Arena"],
  [1750, "Arena"],

  [1090, "TFT"],
  [1100, "TFT Ranked"],

  [1300, "Nexus Blitz"],

  [2000, "Tutorial"],
  [2010, "Tutorial"],
  [2020, "Tutorial"],

  [2300, "Brawl"],
  [2400, "ARAM Mayhem"],

  
]);


