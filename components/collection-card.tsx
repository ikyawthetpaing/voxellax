import Image from "next/image";
import Link from "next/link";
import { Collection } from "@/db/schema";

import {
  getCollectionProducts,
  getCollectionThumbnails,
} from "@/lib/actions/collections";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

interface CollectionCardProps {
  collection: Collection;
}

export async function CollectionCard({ collection }: CollectionCardProps) {
  const collectionProducts = await getCollectionProducts(collection.id);

  const totalProducts = collectionProducts.length;
  const thumbnails = await getCollectionThumbnails(collection.id, 3);

  return (
    <Link href={`/user/${collection.userId}/collections/${collection.id}`}>
      <div className="grid gap-3">
        <div className="overflow-hidden rounded-lg">
          <AspectRatio ratio={4.5 / 3}>
            {thumbnails[0] ? (
              <Image
                src={thumbnails[0].url}
                alt={thumbnails[0].name}
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
              {thumbnails[1] ? (
                <Image
                  src={thumbnails[1].url}
                  alt={thumbnails[1].name}
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
              {thumbnails[2] ? (
                <Image
                  src={thumbnails[2].url}
                  alt={thumbnails[2].name}
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
