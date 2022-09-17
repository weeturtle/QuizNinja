/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverComponents: true
  },
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig;
