import { SiteConfig } from "@/types";

import { absoluteUrl } from "@/lib/utils";

export const siteConfig: SiteConfig = {
  name: "Voxellax",
  title: "Voxellax: Graphics, Fonts, Books, and Design Templates",
  description:
    "Elevate your creative endeavors with millions distinctive fonts, graphics, themes, images, and templates crafted by talented independent creators worldwide.",
  url: absoluteUrl(),
  ogImage: absoluteUrl("/og.png"),
  authors: [
    { name: "Kyaw Thet Paing", url: "https://ikyawthetpaing.vercel.app" },
  ],
  creator: {
    name: "Kyaw Thet Paing",
    username: "@ikyawthetpaing",
  },
  keywords: ["Voxellax", "Graphics", "Fonts", "Books", "Design", "Templates"],
};
