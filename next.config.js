/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLEAPI: process.env.NEXT_PUBLIC_API_GOOGLE_KEY,
  },
};

module.exports = nextConfig;
