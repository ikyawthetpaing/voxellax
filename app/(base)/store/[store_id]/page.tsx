import { notFound } from "next/navigation";

import { categoriesFilterItem, priceRangeFilterItem } from "@/config/filter";

import { getProducts } from "@/lib/actions/product";
import { getStore } from "@/lib/actions/store";
import { ProductsListWithFilter } from "@/components/product/products-list-with-filter";
import { Shell } from "@/components/shell";

interface StorePageProps {
  params: {
    store_id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function StorePage({
  params,
  searchParams,
}: StorePageProps) {
  const store = await getStore(params.store_id);

  if (!store) {
    notFound();
  }

  const { page, per_page, sort, price_range, categories } = searchParams;

  // Products transaction
  const _page = typeof page === "string" ? page : "1";

  const limit = typeof per_page === "string" ? parseInt(per_page) : 6;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const { count: productCount, items: products } = await getProducts({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    price_range: typeof price_range === "string" ? price_range : null,
    categories: typeof categories === "string" ? categories : null,
    store_ids: store.id,
  });

  const pageCount = Math.ceil(productCount / limit);

  return (
    <Shell>
      {products && (
        <ProductsListWithFilter
          products={products}
          filterItems={[priceRangeFilterItem, categoriesFilterItem]}
          page={_page}
          pageCount={pageCount}
        />
      )}
    </Shell>
  );
}
