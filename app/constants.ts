export const MATCH_REGION_MAPPING = new Map<string, string>([ //MATCH-V5

  ["na1", "americas"],
  ["euw1", "europe"],
  ["kr", "asia"],
  ["br1", "americas"],
  ["eun1", "europe"],
  ["la1", "americas"],
  ["la2", "americas"],
  ["tr1", "europe"],
  ["jp1", "asia"],
  ["ru", "europe"],
  ["oc1", "sea"],
  ["sg2", "sea"],
  ["tw2", "sea"],
  ["vn2", "sea"],

])

export const ACCOUNT_REGION_MAPPING  = new Map<string, string>([ //ACCOUNT-V1
  
  ["na1", "americas"],
  ["euw1", "europe"],
  ["kr", "asia"],
  ["br1", "americas"],
  ["eun1", "europe"],
  ["la1", "americas"],
  ["la2", "americas"],
  ["tr1", "europe"],
  ["jp1", "asia"],
  ["ru", "europe"],
  ["oc1", "americas"],
  ["ph2", "asia"],
  ["sg2", "asia"],
  ["th2", "asia"],
  ["tw2", "asia"],
  ["vn2", "asia"],
  
]);

export const regions = [
    { value: "na1", label: "NA" },
    { value: "euw1", label: "EUW" },
    { value: "kr", label: "KR" },
    { value: "eun1", label: "EUNE" },
    { value: "br1", label: "BR" },
    { value: "vn2", label: "VN" },
    { value: "tr1", label: "TR" },
    { value: "la1", label: "LAN" },
    { value: "la2", label: "LAS" },
    { value: "jp1", label: "JP" },
    { value: "oc1", label: "OCE" },
    { value: "ru", label: "RU" },
    { value: "tw2", label: "TW" },
    { value: "sg2", label: "SG" },
    { value: "me1", label: "ME" },
];


export const QUEUE_MAP = new Map<number, string>([

  //https://static.developer.riotgames.com/docs/lol/queues.json

  [0, "Custom"],
  
  [400, "Normal Draft"],
  [430, "Normal Blind"],
  [490, "Quickplay"],
  [480, "Swiftplay"],

  [420, "Ranked Solo/Duo"],
  [440, "Ranked Flex"],
  [710, "Ranked 5s"],

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

export const LEADERBOARD_QUEUE_MAP = new Map<string, string>([
  
  ["RANKED_SOLO_5x5", "Solo"],
  ["RANKED_FLEX_SR", "Flex"],

]);

export const STAT_SHARD_MAP = new Map<number, string>([

  [5008, "AdaptiveForce"],
  [5005, "AttackSpeed"],
  [5007, "AbilityHaste"],
  [5014, "MovementSpeed"],
  [5001, "Health"],
  [5011, "HealthScaling"],
  [5013, "Tenacity"],
    
]);

export const RUNE_TREE_MAP = new Map<number, number>([

  [8112, 8100],
  [8128, 8100],
  [9923, 8100],
  [8351, 8300],
  [8360, 8300],
  [8369, 8300],
  [8005, 8000],
  [8008, 8000],
  [8021, 8000],
  [8010, 8000],
  [8437, 8400],
  [8439, 8400],
  [8465, 8400],
  [8214, 8200],
  [8229, 8200],
  [8230, 8200],
  [8992, 8200]

]);
