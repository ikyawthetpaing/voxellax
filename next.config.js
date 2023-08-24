/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["uploadthing.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
