export function getRelativeTime(unixTime: number): string {


  const seconds = Math.floor((Date.now() - unixTime) / 1000);

  const intervals = [
    { label: "year", seconds: 365 * 24 * 60 * 60 },
    { label: "month", seconds: 30 * 24 * 60 * 60 },
    { label: "day", seconds: 24 * 60 * 60 },
    { label: "hour", seconds: 60 * 60 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ] as const; //Narrows down inference types

  for (const interval of intervals) {

    const count = Math.floor(seconds / interval.seconds);

    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }

  }

  return "just now";
}