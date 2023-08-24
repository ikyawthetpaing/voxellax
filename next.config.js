/** @type {import('next').NextConfig} */

import("./env.mjs");

const nextConfig = {
  images: {
    domains: ["uploadthing.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
