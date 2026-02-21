/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // API-Sports CDN (future use)
      {
        protocol: "https",
        hostname: "media.api-sports.io",
        pathname: "/**",
      },
      // Wikipedia — team logos come from here in the real API response
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
