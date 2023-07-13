import { Product } from "@prisma/client";
import { notFound } from "next/navigation";
import dayjs from "dayjs";

import { ProductsTable } from "@/components/products-table";
import { db } from "@/lib/db";

export const metadata = {
  // metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Products",
  description: "Manage your products",
};

interface ProductsPageProps {
  params: {
    store_id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const store_id = params.store_id;

  const { page, per_page, sort, name, date_range } = searchParams;

  const store = await db.store.findFirst({
    where: {
      id: store_id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!store) {
    notFound();
  }

  // Number of products to show per page
  const limit = typeof per_page === "string" ? parseInt(per_page) : 10;
  // Number of products to skip
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;
  // Column and order to sort by
  const [column, order] =
    typeof sort === "string"
      ? (sort.split(".") as [
          keyof Product | undefined,
          "asc" | "desc" | undefined
        ])
      : [];
  // Date range for created date
  const [start_date, end_date] =
    typeof date_range === "string"
      ? date_range.split("to").map((date) => dayjs(date).toDate())
      : [];

  // Transaction is used to ensure both queries are executed in a single transaction
  const { storeProducts, totalProducts } = await db.$transaction(async (tx) => {
    const storeProducts = await db.product.findMany({
      take: limit,
      skip: offset,
      where: {
        storeId: store_id,
        name: {
          contains: typeof name === 'string' ? name : undefined,
        },
        createdAt: {
          gte: start_date || undefined,
          lte: end_date || undefined,
        },
      },
      orderBy: {
        [column && column in db.product ? column : "createdAt"]:
          order === "asc" ? "asc" : "desc",
      },
    });

    const totalProducts = await db.product.count({
      where: {
        storeId: store_id,
        name: {
          contains: typeof name === 'string' ? name : undefined,
        },
        createdAt: {
          gte: start_date || undefined,
          lte: end_date || undefined,
        },
      },
    });

    return {
      storeProducts,
      totalProducts,
    };
  });

  const pageCount = Math.ceil(totalProducts / limit);

  return (
    <ProductsTable
      products={storeProducts}
      pageCount={pageCount}
      storeId={store_id}
    />
  );
}
``;
