import { FilterItem } from "@/types";

import { Product } from "@/db/schema";

import { Empty } from "@/components/empty";
import { ProductFilterForm } from "@/components/forms/product-filter-form";
import { ProductSortForm } from "@/components/forms/product-sort-form";
import { Heading } from "@/components/heading";
import { PaginationButton } from "@/components/pagination-button";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilterFormSheet } from "@/components/sheets/product-filter-sheet";

interface Props {
  products: Product[];
  filterItems: FilterItem[];
  pageCount: number;
  page: string;
  per_page?: string;
}

export async function ProductsListWithFilter({
  products,
  filterItems,
  page,
  pageCount,
  per_page = "6",
}: Props) {
  return (
    <div className="flex gap-8 md:mt-8">
      <div className="space-y-4 max-md:hidden">
        <Heading>Filter:</Heading>
        <ProductFilterForm className="w-64" filterItems={filterItems} />
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex gap-4 sm:grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
          <div className="hidden max-md:block">
            <ProductFilterFormSheet filterItems={filterItems} />
          </div>
          <span className="hidden lg:block" />
          <span className="hidden sm:block" />
          <ProductSortForm />
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        ) : (
          <Empty icon="packageSearch" message="No product found" />
        )}
        {products.length > 0 ? (
          <PaginationButton
            pageCount={pageCount}
            page={page}
            per_page={per_page}
          />
        ) : null}
      </div>
    </div>
  );
}
