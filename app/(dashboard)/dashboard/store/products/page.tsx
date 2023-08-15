import { Metadata } from "next";
import { notFound } from "next/navigation";
import { data } from "@/constants/data-dev";

// import { Product } from "@/types/dev";
import { Button } from "@/components/ui/button";
import { ProductFormSheet } from "@/components/dashboard/product-form-sheet";
import { ProductsTable } from "@/components/dashboard/products-table";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  // metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Products",
  description: "Manage your products",
};

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function StoreProductsPage({ searchParams }: ProductsPageProps) {
  const store = data.stores[0];

  const { page, per_page, sort, name, category } = searchParams ?? {};

  if (!store) {
    notFound();
  }

  // Number of items per page
  const limit = typeof per_page === "string" ? parseInt(per_page) : 10;
  // Number of items to skip
  // const offset =
  //   typeof page === "string"
  //     ? parseInt(page) > 0
  //       ? (parseInt(page) - 1) * limit
  //       : 0
  //     : 0;
  // // Column and order to sort by
  // const [column, order] =
  //   typeof sort === "string"
  //     ? (sort.split(".") as [
  //         keyof Product | undefined,
  //         "asc" | "desc" | undefined,
  //       ])
  //     : [];

  // const categories =
  //   typeof category === "string"
  //     ? (category.split(".") as Product["category"][])
  //     : [];

  // Transaction is used to ensure both queries are executed in a single transaction
  // const { storeProducts, totalProducts } = await db.transaction(async (tx) => {
  //   const storeProducts = await tx
  //     .select()
  //     .from(products)
  //     .limit(limit)
  //     .offset(offset)
  //     .where(
  //       and(
  //         eq(products.storeId, storeId),
  //         // Filter by name
  //         typeof name === "string"
  //           ? like(products.name, `%${name}%`)
  //           : undefined,
  //         // Filter by category
  //         categories.length > 0
  //           ? inArray(products.category, categories)
  //           : undefined
  //       )
  //     )
  //     .orderBy(
  //       column && column in products
  //         ? order === "asc"
  //           ? asc(products[column])
  //           : desc(products[column])
  //         : desc(products.createdAt)
  //     );

  //   const totalProducts = await tx
  //     .select({
  //       count: sql<number>`count(${products.id})`,
  //     })
  //     .from(products)
  //     .where(
  //       and(
  //         eq(products.storeId, storeId),
  //         typeof name === "string"
  //           ? like(products.name, `%${name}%`)
  //           : undefined,
  //         categories.length > 0
  //           ? inArray(products.category, categories)
  //           : undefined
  //       )
  //     );

  //   return {
  //     storeProducts,
  //     totalProducts: Number(totalProducts[0]?.count) ?? 0,
  //   };

  const storeProducts = data.products.filter(
    ({ storeId }) => storeId === store.id
  );
  const totalProducts = storeProducts.length;

  const pageCount = Math.ceil(totalProducts / limit);
  return (
    <Shell layout="dashboard">
      {storeProducts.length > 0 ? (
        <ProductsTable
          data={storeProducts}
          pageCount={pageCount}
          storeId={store.id}
        />
      ) : (
        // <div>Products</div>
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
            <ProductFormSheet
              trigger={
                <Button size="sm" className="mt-6 w-full">
                  Create Product
                </Button>
              }
            />
          </div>
        </div>
      )}
    </Shell>
  );
}
