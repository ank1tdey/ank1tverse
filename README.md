# ank1tverse.tech

Ankit Dey's portfolio, built with Next.js (static export), React Bits, GSAP, Lenis and Tailwind.

## Change text, links, images or videos

Everything on the site is in `lib/content.js`. Put your files in `public/media/` and write their paths without a leading slash, for example `media/reel-1.mp4`.

- `hero.image`: your photo behind your name (shown in black and white). `hero.cutout`: the same photo with the background removed, so you stand in front of your name.
- `showreel`: the five boxes under the intro (reels, wide videos, images).
- `projects`: the six project slots.
- `about.photo`: the picture next to the About text.

An empty path keeps the placeholder box. Videos play muted on a loop while they're on screen. For the web, keep each video under about 10 MB (MP4, H.264). I can compress them for you.

## Run it on your Mac

1. Install Node.js (LTS) from nodejs.org if you don't have it.
2. Open this folder in VS Code, then Terminal → New Terminal.
3. `npm install` (first time only).
4. `npm run dev` and open http://localhost:3000.

## Build and upload

1. `npm run build` creates the `out` folder.
2. Upload everything inside `out` to `public_html`, including the hidden `.htaccess` files and the `_next` folder.

`npm run build:preview` makes a second copy in `preview-dist` with relative paths, used only for preview links.

## Where things are

- `components/`: one file per section (Header, Hero, Intro, Projects, Services, Approach, About, Contact), plus the AD logo, the live clock, the media boxes and the WhatsApp goo effect.
- `components/reactbits/`: the React Bits library (about 40 components). Only the ones imported end up on the site.
- `app/globals.css`: colours, type and layout.

React Bits is MIT + Commons Clause licensed: free to use in this site, not to resell as components. See `components/reactbits/LICENSE.md`.
