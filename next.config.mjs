/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` writes a plain site to /out that any host can serve.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
