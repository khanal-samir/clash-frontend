/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        protocol: "http",
      },
    ],
  },
  reactStrictMode: false, // renders socket events twice
};

export default nextConfig;
