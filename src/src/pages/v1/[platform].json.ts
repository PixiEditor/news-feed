import type { APIRoute } from "astro";
import sharedData from "../../../../shared.json"
import standaloneData from "../../../../standalone.json"
import steamData from "../../../../steam.json"
import msstoreData from "../../../../ms-store.json"
import { getPlatform, parseDateOnly } from "../../utility/helpers";
import { getImage } from "astro:assets";

const platforms: Platform[] = [
    getPlatform("standalone", sharedData, standaloneData),
    getPlatform("steam", sharedData, steamData),
    getPlatform("ms-store", sharedData, msstoreData),
]

async function optimizeCover(entry: FeedEntry, site?: URL): Promise<FeedEntry> {
    if (!entry.coverImageUrl || !site)
        return entry;

    let optimizedImage = await getImage({ src: entry.coverImageUrl, inferSize: true, format: "webp" });
    let optimizedSrc = new URL(optimizedImage.src, site).toString();

    return {
        ...entry,
        coverImageUrl: optimizedSrc
    };
}

export const GET: APIRoute = async ({ params, site }) => {
    const id = params.platform;
    const platform = platforms.find(x => x.identifier === id);

    if (!platform)
        throw new Error(`No feed called '${id}' has been defined in the platforms array`);

    const renderedFeed = platform.feeds
        .flat()
        .sort((a, b) => parseDateOnly(a.date).getTime() - parseDateOnly(b.date).getTime())
        .map(async x => optimizeCover(x, site));

    return new Response(JSON.stringify(await Promise.all(renderedFeed)))
};

export function getStaticPaths() {
    return platforms.map(x => { return { params: { platform: x.identifier } } });
}
