import { Metadata } from "next";
import { notFound } from "next/navigation";

import { priceRangeFilterItem } from "@/config/filter";
import { siteConfig } from "@/config/site";
import { getProducts } from "@/lib/actions/product";
import { getStore } from "@/lib/actions/store";
import { getUserAction } from "@/lib/actions/user";
import { absoluteUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid } from "@/components/layout/grid";
import { ProductsListWithFilter } from "@/components/products-list-with-filter";
import { Shell } from "@/components/shell";

interface StorePageProps {
  params: {
    storeId: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata({
  params,
}: StorePageProps): Promise<Metadata> {
  const store = await getStore(params.storeId);

  if (!store) {
    return {};
  }
  const url = process.env.NEXT_PUBLIC_APP_URL;

  const user = await getUserAction(store.userId);
  const sanitizedAuthors = user
    ? [{ name: user.name ?? "Unknown", url: `${url}/user/${user.id}` }]
    : [];

  // const ogUrl = new URL(`${url}/api/og`);
  // ogUrl.searchParams.set("heading", store.name);
  // ogUrl.searchParams.set("type", "Listing Post");
  // ogUrl.searchParams.set("mode", "dark");
  const ogUrl = `${url}/og.png`;
  const description = store.description
    ? store.description
    : `Check out ${store.name} on ${siteConfig.name}`;

  return {
    title: store.name,
    description: description,
    authors: sanitizedAuthors,
    openGraph: {
      title: store.name,
      description: description,
      type: "profile",
      url: absoluteUrl(`/store/${store.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: store.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: store.name,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function StorePage({
  params,
  searchParams,
}: StorePageProps) {
  const store = await getStore(params.storeId);

  if (!store) {
    notFound();
  }

  const { page, per_page, sort, price_range } = searchParams;

  // Products transaction
  const _page = typeof page === "string" ? page : "1";

  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const { count: productCount, items: products } = await getProducts({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    price_range: typeof price_range === "string" ? price_range : null,
    store_ids: store.id,
  });

  const pageCount = Math.ceil(productCount / limit);

  return (
    <Shell>
      {products && (
        <ProductsListWithFilter
          products={products}
          filterItems={[priceRangeFilterItem]}
          page={_page}
          pageCount={pageCount}
        />
      )}
    </Shell>
  );
}
