import { SiteConfig } from "@/types";

import { absoluteUrl } from "@/lib/utils";

export const siteConfig: SiteConfig = {
  name: "Voxellax",
  title: "Voxellax: Graphics, Fonts, Books, and Design Templates",
  description:
    "Elevate your creative endeavors with millions distinctive fonts, graphics, themes, images, and templates crafted by talented independent creators worldwide.",
  url: absoluteUrl(),
  ogImage: absoluteUrl("/og.png"),
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
