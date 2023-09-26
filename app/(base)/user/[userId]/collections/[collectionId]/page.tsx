import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Product } from "@/db/schema";

import { siteConfig } from "@/config/site";

import {
  getCollection,
  getCollectionProducts,
  getCollectionThumbnails,
} from "@/lib/actions/collections";
import { getProduct } from "@/lib/actions/product";
import { getUserAction } from "@/lib/actions/user";
import { absoluteUrl, cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ProductsList } from "@/components/products-list";

interface UserCollectionPageProps {
  params: {
    collectionId: string;
  };
}

export async function generateMetadata({
  params,
}: UserCollectionPageProps): Promise<Metadata> {
  const collection = await getCollection(params.collectionId);
  if (!collection) {
    return {};
  }

  const user = await getUserAction(collection?.userId);
  if (!user) {
    return {};
  }

  const userName = user.name ?? "Unknown";
  const title = `${user.name}'s ${collection.name} collection`;
  const description = `Check out ${collection.name} collection by ${user.name}.`;

  const thumbnails = await getCollectionThumbnails(collection.id, 1);
  const ogImage = thumbnails.length ? thumbnails[0].url : siteConfig.ogImage;

  const ogUrl = new URL(ogImage);
  ogUrl.searchParams.set("heading", collection.name);
  ogUrl.searchParams.set("type", "Listing Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: title,
    description: description,
    authors: [{ name: userName, url: absoluteUrl(`/user/${user.id}`) }],
    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: absoluteUrl(`user/${user.id}/collections/${collection.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 900,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function UserCollectionPage({
  params,
}: UserCollectionPageProps) {
  const collection = await getCollection(params.collectionId);

  if (!collection) {
    notFound();
  }

  const collectionProducts = await getCollectionProducts(collection.id);

  const products: Product[] = [];

  await Promise.all(
    collectionProducts.map(async (value) => {
      const product = await getProduct(value.productId);
      if (product) {
        products.push(product);
      }
    })
  );

  const totalProducts = products.length;

  return (
    <section className="space-y-8">
      <div>
        <Link
          href={`/user/${collection.userId}/collections`}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "gap-2"
          )}
        >
          <Icons.chevronLeft className="h-4 w-4" />
          Back to Collections
        </Link>
      </div>
      <div className="space-y-4">
        <h3 className="text-center text-2xl font-medium">{collection.name}</h3>
        <h3 className="text-center text-xs">
          <span className="capitalize">{collection.privacy}</span> •{" "}
          {totalProducts} {totalProducts > 1 ? "Products" : "Product"}
        </h3>
      </div>
      <hr />
      {products && <ProductsList products={products} />}
    </section>
  );
}
