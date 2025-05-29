export const getRelativeTimeString = (date: Date): string => {
    const now = new Date();
    const diffInMs = date.getTime() - now.getTime();
    const diffInSecs = Math.floor(Math.abs(diffInMs) / 1000);
    const diffInMins = Math.floor(diffInSecs / 60);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    const suffix = diffInMs < 0 ? " ago" : " from now";

    if (diffInSecs < 10) return "just now";
    if (diffInSecs < 60) return `${diffInSecs}s${suffix}`;
    if (diffInMins < 60) return `${diffInMins}m${suffix}`;
    if (diffInHours < 24) return `${diffInHours}h${suffix}`;
    if (diffInDays < 7) return `${diffInDays}d${suffix}`;
    if (diffInWeeks < 4) return `${diffInWeeks}w${suffix}`;
    if (diffInMonths < 12) return `${diffInMonths}mo${suffix}`;

    return `${diffInYears}y${suffix}`;
}