// After `next build`: copy the long-cache rule into /out/_next/static
// (every file name there carries a content hash, so it can be cached for a year).
// Asset paths stay absolute (/_next/...): Next's runtime needs them exactly as
// built, and the site is served from the domain root.
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const staticDir = join('out', '_next', 'static');
if (existsSync(staticDir)) copyFileSync('scripts/static-htaccess/.htaccess', join(staticDir, '.htaccess'));

console.log('postbuild: cache rules copied');
