/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    concurrentFeatures: true,
    serverComponents: true
  },
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig;
