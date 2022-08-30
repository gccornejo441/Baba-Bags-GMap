/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLEAPI: process.env.NEXT_PUBLIC_API_GOOGLE_KEY,
    FIREBASEAPI: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  },
};

module.exports = nextConfig;
