import { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { getProductAction } from "@/lib/actions/product";
import { getStoreAction } from "@/lib/actions/store";
import { absoluteUrl } from "@/lib/utils";
import { Listing } from "@/components/listing";
import { Shell } from "@/components/shell";

interface ProductPageProps {
  params: {
    storeId: string;
    productId: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductAction(params.productId);

  if (!product) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;
  const thumbnail =
    product.images?.find((image) => image.isThumbnail) ??
    product.images?.[0] ??
    null;
  const ogUrl = new URL(thumbnail?.url || `${url}/og.png`);
  ogUrl.searchParams.set("heading", product.name);
  ogUrl.searchParams.set("type", "Listing product");
  ogUrl.searchParams.set("mode", "dark");

  const store = await getStoreAction(product.storeId);
  const sanitizedAuthors = store
    ? [{ name: store.name, url: `${url}/store/${store.id}` }]
    : [];

  const description =
    product.description ?? `Check out ${product.name} on ${siteConfig.name}`;

  return {
    title: product.name,
    description: description,
    authors: sanitizedAuthors,
    openGraph: {
      title: product.name,
      description: description,
      type: "article",
      url: absoluteUrl(`/listing/${product.id}`),
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 900,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: description,
      images: [ogUrl],
    },
  };
}

export default async function ListingPage({ params }: ProductPageProps) {
  const product = await getProductAction(params.productId);

  if (!product) {
    notFound();
  }

  return (
    <Shell>
      <Listing product={product} />
    </Shell>
  );
}
