import { FilterItem, Option } from "@/types";

export const productTags = [
  "bestseller",
  "featured",
  "popular",
  "trending",
  "limited",
  "exclusive",
];

export const productSortOptions: Option[] = [
  { label: "Best Match", value: "relevant" },
  { label: "Popular", value: "popular" },
  { label: "Recently added", value: "createdAt.desc" },
  { label: "Trending", value: "trending" },
  { label: "Price: Low - High", value: "price.asc" },
  { label: "Price: High - Low", value: "price.desc" },
];

export const priceRanges = [
  { min: 2, max: 19 },
  { min: 20, max: 39 },
  { min: 40, max: 59 },
  { min: 60, max: 79 },
  { gte: 80 },
];

export const priceRangeOptions: Option[] = priceRanges.map((priceRange) => ({
  label: priceRange.gte
    ? `$${priceRange.gte}+`
    : `$${priceRange.min} - $${priceRange.max}`,
  value: priceRange.gte
    ? `${priceRange.gte}-${Number.MAX_SAFE_INTEGER}`
    : `${priceRange.min}-${priceRange.max}`,
}));
