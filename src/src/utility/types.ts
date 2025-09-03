interface Platform {
    identifier: string;
    feeds: Feed[]
}

interface FeedEntry {
    title: string
    newsType:
    | "NewVersion"
    | "YtVideo"
    | "BlogPost"
    | "OfficialAnnouncement"
    | "Misc"
    url: string
    date: string
    coverImageUrl?: string
}

type Feed = FeedEntry[]
