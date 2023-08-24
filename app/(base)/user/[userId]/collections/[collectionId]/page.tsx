import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { data } from "@/constants/data-dev";

import { Product } from "@/types/dev";
import { absoluteUrl, cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ProductsList } from "@/components/products-list";

interface UserCollectionPageProps {
  params: {
    collectionId: string;
  };
}

async function getCollection(collectionId: string) {
  const collection = data.collections.find(({ id }) => id === collectionId);

  if (!collection) {
    null;
  }
  return collection;
}

export async function generateMetadata({
  params,
}: UserCollectionPageProps): Promise<Metadata> {
  const collection = await getCollection(params.collectionId);

  const user = data.users.find(({ id }) => id === collection?.userId);

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
    description: `${collection.name} by ${user?.name}`,
    authors: [{ name: user?.name ?? "", url: `${url}/user/${user?.id}` }],
    openGraph: {
      title: collection.name,
      description: `${collection.name} by ${user?.name}`,
      type: "website",
      url: absoluteUrl(`user/${user?.id}/collections/${collection.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 900,
          alt: collection.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: collection.name,
      description: `${collection.name} by ${user?.name}`,
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

  const collectionProducts = data.collectionProducts.filter(
    ({ collectionId }) => collectionId === collection.id
  );

  const products: Product[] = [];

  collectionProducts.map((p) => {
    const product = data.products.find(({ id }) => id === p.productId);
    if (product) {
      products.push(product);
    }
  });

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
        <h1 className="text-center text-2xl font-medium">{collection.name}</h1>
        <h1 className="text-center text-xs">
          {collection.privacy} • {totalProducts}{" "}
          {totalProducts > 1 ? "Products" : "Product"}
        </h1>
      </div>
      <hr />
      {/* {products && <ProductsList products={products} />} */}
    </section>
  );
}
