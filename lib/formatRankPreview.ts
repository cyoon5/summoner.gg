export default function formatRank(tier: string, rank: string, leaguePoints: number): string {
    const tierMap: Record<string, string> = {
        IRON: "I",
        BRONZE: "B",
        SILVER: "S",
        GOLD: "G",
        PLATINUM: "P",
        EMERALD: "E",
        DIAMOND: "D",
        MASTER: "M",
        GRANDMASTER: "GM",
        CHALLENGER: "C",
    };

    const rankMap: Record<string, string> = {
        I: "1",
        II: "2",
        III: "3",
        IV: "4",
    };

    if (["MASTER", "GRANDMASTER", "CHALLENGER"].includes(tier)) {
        return `${tierMap[tier]}•${leaguePoints}LP`;
    }

    return `${tierMap[tier]}${rankMap[rank]}`;
}