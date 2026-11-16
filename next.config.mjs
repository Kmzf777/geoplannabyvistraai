/** Static export: the site deploys as plain files (any host, no server). */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  distDir: process.env.NEXT_DIST || '.next',
};
export default nextConfig;
