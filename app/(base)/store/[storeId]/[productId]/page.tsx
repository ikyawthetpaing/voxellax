import { Metadata } from "next";
import { notFound } from "next/navigation";
import { data } from "@/constants/data-dev";

import { absoluteUrl } from "@/lib/utils";
import { Listing } from "@/components/listing";
import { Shell } from "@/components/shell";

interface ProductPageProps {
  params: {
    storeId: string;
    productId: string;
  };
}

async function getProduct(productId: string) {
  const product = data.products.find(({ id }) => id === productId); // <- dev

  if (!product) {
    null;
  }

  return product;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.productId);

  if (!product) {
    return {};
  }

  const thumbnail = { url: undefined }; // <- dev

  const url = process.env.NEXT_PUBLIC_APP_URL;

  const sanitizedAuthors = data.stores.filter(
    ({ id }) => id === product.storeId
  ); // <- dev

  const ogUrl = new URL(thumbnail?.url ?? `${url}/og.png`);
  ogUrl.searchParams.set("heading", product.name);
  ogUrl.searchParams.set("type", "Listing product");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: product.name,
    description: product.description,
    authors: sanitizedAuthors,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "article",
      url: absoluteUrl(`/store/${product.storeId}/${product.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 900,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function ListingPage({ params }: ProductPageProps) {
  const product = await getProduct(params.productId);

  if (!product) {
    notFound();
  }

  return (
    <Shell>
      <Listing product={product} />
    </Shell>
  );
}
