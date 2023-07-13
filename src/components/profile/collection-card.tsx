import Link from "next/link";
import Image from "next/image";
import { Collection } from "@/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

import data from "@/helpers/data.json"; // <- dev

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  let totalProducts = collection.products.length;
  let images = collection.products.map((product) => {
    let _product = data.products.find(({ id }) => id === product.id);
    if (_product) {
      return _product.images[0];
    }
  });

  return (
    <Link href={`/profile/collections/${collection.id}`}>
      <div className="grid gap-3">
        <div className="rounded-lg overflow-hidden">
          <AspectRatio ratio={4.5 / 3}>
            {images[0] ? (
              <Image
                src={images[0]}
                alt={collection.name}
                fill
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <Skeleton className="w-full h-full" />
            )}
          </AspectRatio>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg overflow-hidden">
            <AspectRatio ratio={4.5 / 3}>
              {images[1] ? (
                <Image
                  src={images[1]}
                  alt={collection.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              ) : (
                <Skeleton className="w-full h-full" />
              )}
            </AspectRatio>
          </div>
          <div className="rounded-lg overflow-hidden">
            <AspectRatio ratio={4.5 / 3}>
              {images[2] ? (
                <Image
                  src={images[2]}
                  alt={collection.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              ) : (
                <Skeleton className="w-full h-full" />
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
      <div className="rounded-lg overflow-hidden">
        <AspectRatio ratio={4.5 / 3}>
          <Skeleton className="w-full h-full" />
        </AspectRatio>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg overflow-hidden">
          <AspectRatio ratio={4.5 / 3}>
            <Skeleton className="w-full h-full" />
          </AspectRatio>
        </div>
        <div className="rounded-lg overflow-hidden">
          <AspectRatio ratio={4.5 / 3}>
            <Skeleton className="w-full h-full" />
          </AspectRatio>
        </div>
      </div>
      <div className="flex justify-between">
        <Skeleton className="w-1/4 h-5" />
        <Skeleton className="w-1/4 h-5" />
      </div>
    </div>
  );
}
