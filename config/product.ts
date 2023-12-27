import { Option } from "@/types";

export const productTags = [
  "bestseller",
  "featured",
  "popular",
  "trending",
  "limited",
  "exclusive",
];

export const productSortOptions: Option[] = [
  { label: "Recently added", value: "createdAt.desc" },
  { label: "Price: Low - High", value: "price.asc" },
  { label: "Price: High - Low", value: "price.desc" },
];

export const priceRanges = [
  { min: 0, max: 9 },
  { min: 10, max: 19 },
  { min: 20, max: 29 },
  { min: 30, max: 39 },
  { min: 40, max: 49 },
  { min: 50, max: 59 },
  { min: 60, max: 69 },
  { min: 70, max: 79 },
  { min: 80, max: 89 },
  { min: 90, max: 99 },
  { gte: 100 },
];

export const priceRangeOptions: Option[] = priceRanges.map((priceRange) => ({
  label: priceRange.gte
    ? `$${priceRange.gte}+`
    : `$${priceRange.min} - $${priceRange.max}`,
  value: priceRange.gte
    ? `${priceRange.gte}-${Number.MAX_SAFE_INTEGER}`
    : `${priceRange.min}-${priceRange.max}`,
}));
