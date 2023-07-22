import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Product } from "@/types";
import { absoluteUrl } from "@/lib/utils";
import { Products } from "@/components/products";

// for dev
import data from "@/helpers/data.json";
import { BackButton } from "@/components/back-button";
import { Icons } from "@/components/icons";

interface UserCollectionPageProps {
  params: {
    id: string;
  };
}

async function getCollection(id: string) {
  const collection = data.collections.find(
    (collection) => collection.id === id
  );
  if (!collection) {
    null;
  }

  return collection;
}

export async function generateMetadata({
  params,
}: UserCollectionPageProps): Promise<Metadata> {
  const collection = await getCollection(params.id);

  if (!collection) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", collection.name);
  ogUrl.searchParams.set("type", "Listing Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: collection.name,
    // description: collection.description,
    // authors: product.authors.map((author) => ({
    //   name: author,
    // })),
    openGraph: {
      title: collection.name,
      // description: collection.description,
      type: "article",
      url: absoluteUrl(`/listing/${collection.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: collection.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: collection.name,
      // description: collection.description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function UserCollectionPage({
  params,
}: UserCollectionPageProps) {
  const collection = await getCollection(params.id);

  if (!collection) {
    notFound();
  }

  const products = collection.products.map((product) => {
    const _product = data.products.find(({ id }) => id === product.id);
    if (_product) {
      return _product as Product;
    }
  });

  const totalProducts = products.length;

  return (
    <section className="space-y-8">
      <div>
        <BackButton variant="ghost" size="sm" className="flex gap-2">
          <Icons.chevronLeft className="h-4 w-4" />
          Back to Collections
        </BackButton>
      </div>
      <div className="space-y-4">
        <h1 className="text-center text-2xl font-medium">{collection.name}</h1>
        <h1 className="text-center text-xs">
          Public • {totalProducts} {totalProducts > 1 ? "Products" : "Product"}
        </h1>
      </div>
      <hr />
      {/* {products && <Products products={products} />} */}
    </section>
  );
}
