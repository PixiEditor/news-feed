import { parseFeed } from "./validation";

export function parseDateOnly(value: string, checkFuture?: boolean): Date {
    const [y, m, d] = value.split("-").map(Number);
    
    const entryDate = new Date(Date.UTC(y, m - 1, d));

    const todayTolerant = new Date();
    todayTolerant.setDate(entryDate.getDate() + 2);

    if (entryDate > todayTolerant && checkFuture) {
        throw new Error(`Date '${value}' lies too far in the future than 2 days in the future (max tolerance ${todayTolerant}, parsed ${entryDate}, current date ${new Date()})`);
    }

    return entryDate;
}

export function getPlatform(identifier: string, ... feeds: any): Platform {
    return {
        identifier: identifier,
        feeds: feeds.map((x: any) => parseFeed(x))
    }
}
