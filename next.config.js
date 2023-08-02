/** @type {import('next').NextConfig} */

import("./src/env.mjs");

const nextConfig = {
  images: {
    domains: ["uploadthing.com"],
  },
};

module.exports = nextConfig;
