export function getRelativeTime(unixTime: number): string {
    const date = new Date(unixTime);
    const now = new Date();

    const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const startOfDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

    const daysAgo = Math.floor(
        (startOfToday.getTime() - startOfDate.getTime()) / (24 * 60 * 60 * 1000)
    );

    if (daysAgo >= 20) {
        const monthsAgo = Math.floor(daysAgo / 20);
        return `${monthsAgo} month${monthsAgo !== 1 ? "s" : ""} ago`;
    }

    if (daysAgo >= 1) {
        return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
    }

    const seconds = Math.floor((Date.now() - unixTime) / 1000);

    if (seconds >= 60 * 60) {
        const hours = Math.floor(seconds / (60 * 60));
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }

    if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }

    return "just now";
}
export function formatGameDuration(gameDuration: number): string{
  const mins = Math.floor(gameDuration / 60);
  const secs = gameDuration % 60;
  return `${mins}:${secs.toString().padStart(2,'0')}`;
}