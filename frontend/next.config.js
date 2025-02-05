/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["res.cloudinary.com"],
  },

  // ✅ Disable ESLint during builds (to prevent errors if eslint is removed)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Webpack fixes for caching issues
  webpack: (config) => {
    config.cache = false; // Prevents caching issues
    return config;
  },

  // ✅ Enable SWC for better performance (if Babel is fully removed)
  swcMinify: true,

  // ✅ Set custom build output directory (optional)
  distDir: "build",
};

module.exports = nextConfig;
