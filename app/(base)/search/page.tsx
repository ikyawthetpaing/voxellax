import { Metadata } from "next";

import { categoriesFilterItem, priceRangeFilterItem } from "@/config/filter";

import { getProducts } from "@/lib/actions/product";
import { Heading } from "@/components/heading";
import { ProductsListWithFilter } from "@/components/product/products-list-with-filter";
import { Search } from "@/components/search";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Explore countless digital assets and designs",
  description:
    "Discover a vast library of digital assets and design resources to fuel your creativity.",
};

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const {
    page,
    per_page,
    sort,
    categories,
    subcategories,
    price_range,
    query,
  } = searchParams;

  // Products transaction
  const _page = typeof page === "string" ? page : "1";

  const limit = typeof per_page === "string" ? parseInt(per_page) : 6;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;
  const queryParam = typeof query === "string" ? query : null;

  const { count: productCount, items: products } = await getProducts({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    categories: typeof categories === "string" ? categories : null,
    subcategories: typeof subcategories === "string" ? subcategories : null,
    price_range: typeof price_range === "string" ? price_range : null,
    query: queryParam,
  });

  const pageCount = Math.ceil(productCount / limit);

  return (
    <Shell>
      <div className="flex items-center justify-center md:mt-8">
        <div className="w-full md:w-[600px]">
          <Search size="lg" hideCategorySeletor />
        </div>
      </div>

      <div className="flex gap-8 md:mt-8">
        <div className="hidden w-64 md:block"></div>
        <div className="space-y-4">
          {queryParam && <Heading size="lg">{queryParam}</Heading>}
          <p className="text-sm">
            We found {productCount} {productCount > 1 ? "products" : "product"}{" "}
            matching your search.
          </p>
        </div>
      </div>

      <ProductsListWithFilter
        products={products}
        filterItems={[categoriesFilterItem, priceRangeFilterItem]}
        page={_page}
        pageCount={pageCount}
      />
    </Shell>
  );
}
