// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    image: {
        remotePatterns: [{ protocol: "https" }]
    },
    site: 'https://pixieditor.github.io',
    base: '/news-feed/'
});
