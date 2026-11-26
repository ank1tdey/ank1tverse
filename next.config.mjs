// Static export: `npm run build` writes a plain website to /out that any
// shared hosting can serve. Upload the contents of /out to public_html.
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
