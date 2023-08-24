import Image from "next/image";
import Link from "next/link";
import { Product } from "@/db/schema";

import { getStoreAction } from "@/lib/actions/store";
import { formatPrice } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/icons";

interface ProductCardProps {
  product: Product;
}

export async function ProductCard({ product }: ProductCardProps) {
  const store = await getStoreAction(product.storeId);
  const thumbnail =
    product.images?.find((image) => image.isThumbnail) ??
    product.images?.[0] ??
    null;
  return (
    <Card className="group relative overflow-hidden rounded-lg">
      <CardHeader className="border-b p-0">
        <AspectRatio ratio={4 / 3}>
          <Link
            aria-label={`View ${product.name} details`}
            href={`/listing/${product.id}`}
          >
            {thumbnail ? (
              <Image
                src={thumbnail.url}
                alt={thumbnail.name}
                fill
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Icons.image className="h-16 w-16" />
              </div>
            )}
          </Link>
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-2 pb-0">
        <div className="flex justify-between gap-2">
          <h1 className="line-clamp-1 text-base font-medium">{product.name}</h1>
          <div className="flex items-center rounded-md bg-accent px-1 text-sm font-semibold text-accent-foreground">
            {formatPrice(product.price, 0)}
          </div>
        </div>
      </CardContent>
      {store && (
        <CardFooter className="p-2 pt-0">
          <div className="text-xs">
            <span className="text-muted-foreground">by </span>
            <Link href={`/store/${store.id}`}>{store.name}</Link>
            <span className="text-muted-foreground"> in </span>
            <Link href={`/category/${product.category}`} className="capitalize">
              {product.category}
            </Link>
          </div>
        </CardFooter>
      )}
      {/* <ProductActionButtons
        layout="card"
        productId={product.id}
        className="absolute right-2 top-2 sm:top-0 sm:opacity-0 sm:group-hover:top-2 sm:group-hover:opacity-100"
      /> */}
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="group relative overflow-hidden rounded-lg">
      <CardHeader className="border-b p-0">
        <AspectRatio ratio={4 / 3}>
          <Skeleton className="h-full w-full rounded-b-none" />
        </AspectRatio>
      </CardHeader>
      <CardContent className="flex justify-between gap-2 p-2">
        <Skeleton className="h-5 flex-1" />
        <Skeleton className="h-5 w-10" />
      </CardContent>
      <CardFooter className="p-2 pt-0 sm:hidden">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}
