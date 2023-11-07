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
import { getUser } from "@/lib/actions/user";
import { absoluteUrl, cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Icons } from "@/components/icons";
import { ProductsList } from "@/components/product/products-list";

interface Props {
  params: {
    collection_id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = await getCollection(params.collection_id);
  if (!collection) {
    return {};
  }

  const user = await getUser(collection?.userId);
  if (!user) {
    return {};
  }

  const userName = user.name ?? "Unknown";
  const title = `${user.name}'s ${collection.name} collection`;
  const description = `Explore ${user.name}'s exclusive ${collection.name} collection. Find high-quality ${collection.name} products and more in ${user.name}'s online store.`;

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

export default async function UserCollectionPage({ params }: Props) {
  const collection = await getCollection(params.collection_id);

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
      <div className="flex justify-between">
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
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Add to collection"
              className="rounded-full"
            >
              <Icons.penLine className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="gap-6 px-0 sm:max-w-[425px]">
            Collection update form here
          </DialogContent>
        </Dialog>
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
