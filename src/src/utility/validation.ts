import { z } from "zod";
import { parseDateOnly } from "./helpers";

const NewsType = z.enum([
  "OfficialAnnouncement",
  "NewVersion",
  "BlogPost",
  "YtVideo",
  "Misc",
]);

const FeedEntrySchema = z.object({
  title: z.string(),
  newsType: NewsType,
  url: z.string().url().or(z.string()), // relax if needed
  date: z.string().regex(/^\d{4}-\d{1,2}-\d{1,2}$/, "Date did not match regex").refine(x => parseDateOnly(x, true), "Could not parse date"),
  coverImageUrl: z.string().optional(),
});

const FeedSchema = z.array(FeedEntrySchema);

export function parseFeed(feed: any): Feed {
  const result = FeedSchema.safeParse(feed);

  if (result.error) {
    throw new Error("Validation failed", result.error);
  }

  return result.data as Feed;
}