/** @type {import('next').NextConfig} */

import("./src/env.mjs");

const nextConfig = {
  images: {
    domains: ["fakeimg.pl", "picsum.photos", "uploadthing.com"],
  },
};

module.exports = nextConfig;
