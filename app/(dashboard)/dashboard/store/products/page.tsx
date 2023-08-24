import { Metadata } from "next";
import { notFound } from "next/navigation";
import { data } from "@/constants/data-dev";
import { db } from "@/db";
import { Product, products } from "@/db/schema";
import { and, asc, desc, eq, inArray, like, sql } from "drizzle-orm";

import { env } from "@/env.mjs";
import { getProductAction } from "@/lib/actions/product";
import { getCurrentUserStore } from "@/lib/actions/store";
import { Button } from "@/components/ui/button";
import { AddProductFormSheet } from "@/components/dashboard/add-product-form-sheet";
import { ProductsTable } from "@/components/dashboard/products-table";
import { UpdateProductFormSheet } from "@/components/dashboard/update-product-form-sheet";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Products",
  description: "Manage your products",
};

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function StoreProductsPage({
  searchParams,
}: ProductsPageProps) {
  const store = await getCurrentUserStore();

  if (!store) {
    notFound();
  }

  const { page, per_page, sort, name, category, edit } = searchParams ?? {};

  // Number of items per page
  const limit = typeof per_page === "string" ? parseInt(per_page) : 10;
  // Number of items to skip
  const offset =
    typeof page === "string"
      ? parseInt(page) > 0
        ? (parseInt(page) - 1) * limit
        : 0
      : 0;
  // Column and order to sort by
  const [column, order] =
    typeof sort === "string"
      ? (sort.split(".") as [
          keyof Product | undefined,
          "asc" | "desc" | undefined,
        ])
      : [];

  const categories =
    typeof category === "string"
      ? (category.split(".") as Product["category"][])
      : [];

  // Transaction is used to ensure both queries are executed in a single transaction
  const { storeProducts, totalProducts } = await db.transaction(async (tx) => {
    const storeProducts = await tx
      .select()
      .from(products)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          eq(products.storeId, store.id),
          // Filter by name
          typeof name === "string"
            ? like(products.name, `%${name}%`)
            : undefined,
          // Filter by category
          categories.length > 0
            ? inArray(products.category, categories)
            : undefined
        )
      )
      .orderBy(
        column && column in products
          ? order === "asc"
            ? asc(products[column])
            : desc(products[column])
          : desc(products.createdAt)
      );

    const totalProducts = await tx
      .select({
        count: sql<number>`count(${products.id})`,
      })
      .from(products)
      .where(
        and(
          eq(products.storeId, store.id),
          typeof name === "string"
            ? like(products.name, `%${name}%`)
            : undefined,
          categories.length > 0
            ? inArray(products.category, categories)
            : undefined
        )
      );

    return {
      storeProducts,
      totalProducts: Number(totalProducts[0]?.count) ?? 0,
    };
  });

  const pageCount = Math.ceil(totalProducts / limit);

  let editProduct = undefined;

  if (edit && typeof edit === "string") {
    editProduct = await getProductAction(edit);
  }

  return (
    <Shell layout="dashboard">
      {/* {storeProducts.length > 0 ? (

      ) : (
        <div className="absolute left-1/2 top-1/2 flex h-max w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center p-8 sm:w-max">
          <div className="text-center">
            <h1 className="text-xl">Create your first product</h1>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Creating your first product is easy peasy.
              </p>
              <p className="text-sm text-muted-foreground">
                Create products in minutes and start making sales.
              </p>
            </div>
            <AddProductFormSheet
              storeId={store.id}
              trigger={
                <Button size="sm" className="mt-6 w-full">
                  Create Product
                </Button>
              }
            />
          </div>
        </div>
      )} */}
      <ProductsTable
        data={storeProducts}
        pageCount={pageCount}
        storeId={store.id}
      />
      {editProduct && <UpdateProductFormSheet product={editProduct} />}
    </Shell>
  );
}
