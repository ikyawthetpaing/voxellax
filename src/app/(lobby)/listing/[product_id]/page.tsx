import { notFound } from "next/navigation";
import { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { Listing } from "@/components/listing";
import { Shell } from "@/components/shell";
import { db } from "@/lib/db";

interface ProductPageProps {
  params: {
    product_id: string;
  };
}

async function getProduct(productId: string) {
  const product = db.product.findFirst({
    where: {
      id: productId,
    },
  });
  if (!product) {
    null;
  }

  return product;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.product_id);

  if (!product) {
    return {};
  }

  const thumbnail = await db.file.findFirst({
    where: { productImagesId: product.id, isThumbnail: true },
    select: { url: true },
  });

  const url = process.env.NEXT_PUBLIC_APP_URL;

  const authors = await db.store.findMany({
    where: { id: product.storeId ?? "" },
    select: { name: true, id: true },
  });

  const sanitizedAuthors = authors.map((author) => ({
    name: author.name || undefined,
    url: `${url}/store/${author.id}`,
  }));

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
      url: absoluteUrl(`/listing/${product.id}`),
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
  const product = await getProduct(params.product_id);

  if (!product) {
    notFound();
  }

  return (
    <Shell>
      <Listing product={product} />
    </Shell>
  );
}
