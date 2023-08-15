import Image from "next/image";
import Link from "next/link";
import { data } from "@/constants/data-dev";

import { Collection } from "@/types/dev";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

// import { Collection } from "@prisma/client";
// import { db } from "@/lib/db";

interface CollectionCardProps {
  collection: Collection;
}

export async function CollectionCard({ collection }: CollectionCardProps) {
  // const collectionProducts = await db.collectionProduct.findMany({
  //   where: { collectionId: collection.id },
  // });

  // const totalProducts = collectionProducts.length;
  // const images = await Promise.all(
  //   collectionProducts.map(async (item) => {
  //     const image = await db.file.findFirst({
  //       where: { productImagesId: item.productId },
  //       select: { url: true, name: true },
  //     });
  //     return image;
  //   })
  // );

  const collectionProducts = data.collectionProducts.filter(
    ({ collectionId }) => collectionId === collection.id
  );

  const totalProducts = collectionProducts.length;
  const images: string[] = [];

  return (
    <Link href={`/user/${collection.userId}/collections/${collection.id}`}>
      <div className="grid gap-3">
        <div className="overflow-hidden rounded-lg">
          <AspectRatio ratio={4.5 / 3}>
            {images[0] ? (
              <Image
                src={images[0]}
                alt={images[0]}
                fill
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </AspectRatio>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="overflow-hidden rounded-lg">
            <AspectRatio ratio={4.5 / 3}>
              {images[1] ? (
                <Image
                  src={images[1]}
                  alt={images[1]}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              ) : (
                <Skeleton className="h-full w-full" />
              )}
            </AspectRatio>
          </div>
          <div className="overflow-hidden rounded-lg">
            <AspectRatio ratio={4.5 / 3}>
              {images[2] ? (
                <Image
                  src={images[2]}
                  alt={images[2]}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              ) : (
                <Skeleton className="h-full w-full" />
              )}
            </AspectRatio>
          </div>
        </div>
        <div className="flex justify-between">
          <h1 className="line-clamp-1">{collection.name}</h1>
          <h1 className="text-muted-foreground">
            {totalProducts} {totalProducts > 1 ? "Products" : "Product"}
          </h1>
        </div>
      </div>
    </Link>
  );
}

export function CollectionCardSkeleton() {
  return (
    <div className="grid gap-3">
      <div className="overflow-hidden rounded-lg">
        <AspectRatio ratio={4.5 / 3}>
          <Skeleton className="h-full w-full" />
        </AspectRatio>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="overflow-hidden rounded-lg">
          <AspectRatio ratio={4.5 / 3}>
            <Skeleton className="h-full w-full" />
          </AspectRatio>
        </div>
        <div className="overflow-hidden rounded-lg">
          <AspectRatio ratio={4.5 / 3}>
            <Skeleton className="h-full w-full" />
          </AspectRatio>
        </div>
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-5 w-1/4" />
      </div>
    </div>
  );
}
