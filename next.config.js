/** @type {import('next').NextConfig} */

import("./env.mjs");

const nextConfig = {
  images: {
    domains: ["uploadthing.com", "utfs.io"],
  },
};

module.exports = nextConfig;
