import { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";

import { getProduct } from "@/lib/actions/product";
import { absoluteUrl, getProductThumbnailImage } from "@/lib/utils";
import { Listing } from "@/components/listing";
import { Shell } from "@/components/shell";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.productId);

  if (!product) {
    return {};
  }

  const thumbnailImage = getProductThumbnailImage(product.images);
  const thumbnailUrl = thumbnailImage ? thumbnailImage.url : siteConfig.ogImage;

  const ogUrl = new URL(thumbnailUrl);
  ogUrl.searchParams.set("heading", product.name);
  ogUrl.searchParams.set("type", "Listing product");
  ogUrl.searchParams.set("mode", "dark");

  const description =
    product.description ?? `Check out ${product.name} on ${siteConfig.name}`;

  return {
    title: product.name,
    description: description,
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
