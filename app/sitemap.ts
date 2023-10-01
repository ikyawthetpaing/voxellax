import { type MetadataRoute } from "next";

import { categories } from "@/config/category";

import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categoryRoutes: MetadataRoute.Sitemap = [];
  const subcategoryRoutes: MetadataRoute.Sitemap = [];

  categories.map((category) => {
    categoryRoutes.push({
      url: absoluteUrl(`/category/${category.value}`),
      lastModified: new Date().toISOString(),
    });

    category.subcategories.map((subcategory) =>
      subcategoryRoutes.push({
        url: absoluteUrl(`/category/${category.value}/${subcategory.value}`),
        lastModified: new Date().toISOString(),
      })
    );
  });

  const routes = ["", "/search", "/login"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...categoryRoutes, ...subcategoryRoutes];
}
