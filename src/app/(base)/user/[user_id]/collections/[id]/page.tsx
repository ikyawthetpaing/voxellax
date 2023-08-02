import { Metadata } from "next";
import { notFound } from "next/navigation";
import { absoluteUrl, cn } from "@/lib/utils";
import { Products } from "@/components/products";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Product } from "@prisma/client";

interface UserCollectionPageProps {
  params: {
    id: string;
  };
}

async function getCollection(collectionId: string) {
  const collection = await db.collection.findFirst({
    where: { id: collectionId },
  });
  if (!collection) {
    null;
  }
  return collection;
}

export async function generateMetadata({
  params,
}: UserCollectionPageProps): Promise<Metadata> {
  const collection = await getCollection(params.id);
  const user = await db.user.findFirst({
    where: { id: collection?.userId ?? "" },
  });

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
  const collection = await getCollection(params.id);

  if (!collection) {
    notFound();
  }

  const collectionProducts = await db.collectionProduct.findMany({
    where: { collectionId: collection.id },
    select: { productId: true },
  });

  const products: Product[] = await Promise.all(
    collectionProducts.map(async ({ productId }) => {
      const product = await db.product.findFirst({
        where: { id: productId },
      });
      return product;
    })
  ).then((products) =>
    products.filter((product): product is Product => product !== null)
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
        <h1 className="text-center text-2xl font-medium">{collection.name}</h1>
        <h1 className="text-center text-xs">
          {collection.privacy} • {totalProducts}{" "}
          {totalProducts > 1 ? "Products" : "Product"}
        </h1>
      </div>
      <hr />
      {products && <Products products={products} />}
    </section>
  );
}
