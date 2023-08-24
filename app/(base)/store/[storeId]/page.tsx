import { Metadata } from "next";
import { notFound } from "next/navigation";

import { categories } from "@/config/category";
import { siteConfig } from "@/config/site";
import { getProductsAction } from "@/lib/actions/product";
import { getStoreAction } from "@/lib/actions/store";
import { getUserAction } from "@/lib/actions/user";
import { absoluteUrl } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid } from "@/components/layout/grid";
import { ProductsList } from "@/components/products-list";
import { Shell } from "@/components/shell";

interface StorePageProps {
  params: {
    storeId: string;
  };
}

export async function generateMetadata({
  params,
}: StorePageProps): Promise<Metadata> {
  const store = await getStoreAction(params.storeId);

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

export default async function StorePage({ params }: StorePageProps) {
  const store = await getStoreAction(params.storeId);

  if (!store) {
    notFound();
  }

  const storeProducts = await getProductsAction({
    limit: 8,
    offset: 0,
    store_ids: store.id,
  });

  return (
    <Shell>
      <Grid>
        <Input placeholder="Seach something in this store..." />
        <div className="hidden lg:block"></div>
        <div className="hidden md:block"></div>
        <Select value={"all"}>
          <SelectTrigger className="capitalize">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key={"all"} value={"all"} className="capitalize">
                all
              </SelectItem>
              {categories.map(({ title }) => (
                <SelectItem key={title} value={title} className="capitalize">
                  {title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Grid>
      <ProductsList products={storeProducts} />
    </Shell>
  );
}
