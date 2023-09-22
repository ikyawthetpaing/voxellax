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
  { label: "Best Match", value: "relevant" },
  { label: "Popular", value: "popular" },
  { label: "Recently added", value: "createdAt.desc" },
  { label: "Trending", value: "trending" },
  { label: "Price: Low - High", value: "price.asc" },
  { label: "Price: High - Low", value: "price.desc" },
];
