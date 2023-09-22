import { FilterItem } from "@/types";

import { getCategories, getSubcategories } from "@/config/category";
import { priceRangeOptions } from "@/config/product";

export const priceRangeFilterItem: FilterItem = {
  key: "price_range",
  title: "Price Range",
  type: "single",
  options: priceRangeOptions,
};

export const subcategoriesFilterItem = (categorySlug: string): FilterItem => {
  return {
    key: "subcategories",
    title: "Subcategories",
    type: "multiple",
    options: getSubcategories(categorySlug),
  };
};

export const categoriesFilterItem: FilterItem = {
  key: "categories",
  title: "Categories",
  type: "multiple",
  options: getCategories(),
};
