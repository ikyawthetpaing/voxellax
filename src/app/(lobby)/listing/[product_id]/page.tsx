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

async function getProduct(id: string) {
  const product = db.product.findFirst({
    where: {
      id: id,
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
  const authors = await db.store.findMany({
    where: { id: product?.storeId ?? undefined },
    select: { name: true },
  });
  const sanitizedAuthors = authors.map((author) => ({
    name: author.name || undefined,
  }));

  if (!product) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", product.name);
  ogUrl.searchParams.set("type", "Listing Post");
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
          height: 630,
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
