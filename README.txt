ANK1TVARSE — GitHub Pages deployment

1. Keep index.html, styles.css and script.js together in the repository root.
2. In GitHub, open each file and replace its contents with the matching file in this package.
3. In script.js, replace CONTACT_EMAIL with your real email and WHATSAPP_NUMBER with your WhatsApp number as digits only, including country code (e.g. 91 followed by your number). Do not publish until configured.
4. Commit all three files to the main branch.
5. In Settings > Pages, set deployment source to Deploy from a branch, branch main, folder /(root), if that is your current setup.
6. Open https://ank1tdey.github.io/ank1tverse/ in a private/incognito tab after deployment finishes.

White-page diagnosis: the pasted HTML starts with the stray text “great” before <!doctype html>. Browsers often recover from this, so it is not necessarily the sole cause, but it should be removed. The original animation script also hid hero content while using brittle inline transform manipulation. This package removes the stray text, uses explicit relative asset paths, keeps content visible without JavaScript, and makes reveal animation progressive enhancement.

The website uses plain HTML, CSS and JavaScript. No build step is required. Google Fonts require an internet connection; the layout has system fallbacks.
