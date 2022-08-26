/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponents: true
  },
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig;
