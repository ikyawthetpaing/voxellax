import { SiteConfig } from "@/types";

import { env } from "@/env.mjs";

export const siteConfig: SiteConfig = {
  name: "Voxellax",
  title:
    "Voxellax: Exceptional Stock Photos, Graphics, Fonts, and Design Templates",
  description:
    "Elevate your creative endeavors with an array of millions distinctive fonts, graphics, themes, images, and templates crafted by talented independent creators worldwide.",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.png`,
  links: {
    twitter: "https://twitter.com/voxellax",
    github: "https://github.com/ikyawthetpaing/voxellax",
  },
  authors: [
    { name: "@ikyawthetpaing", url: "https://github.com/ikyawthetpaing" },
  ],
  creator: "@ikyawthetpaing",
  keywords: [
    "Voxellax",
    "Digital Products",
    "Ebooks",
    "Canva Templates",
    "Graphics",
  ],
};
