import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { and, asc, desc, eq, inArray, like, sql } from "drizzle-orm";

import { Product, products } from "@/db/schema";

import { getCurrentUserStore } from "@/lib/actions/store";
import { ProductsTable } from "@/components/dashboard/products-table";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Product Management",
  description:
    "Effortlessly manage and organize your products with the Product Management system. Streamline your product catalog and enhance customer experience.",
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

  const { page, per_page, sort, name, category } = searchParams ?? {};

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

  return (
    <Shell layout="dashboard">
      <ProductsTable data={storeProducts} pageCount={pageCount} />
    </Shell>
  );
}
