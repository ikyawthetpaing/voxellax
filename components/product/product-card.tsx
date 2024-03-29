import Link from "next/link";

import { Product } from "@/db/schema";

import { getStoreById } from "@/lib/actions/store";
import { formatPrice, getProductThumbnailImage } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductActionButtons } from "@/components/product/product-action-buttons";
import { ProductImage } from "@/components/product/product-image";

interface ProductCardProps {
  product: Product;
}

export async function ProductCard({ product }: ProductCardProps) {
  const store = await getStoreById(product.storeId);
  const thumbnail = getProductThumbnailImage(product.images);

  return (
    <Card className="group relative overflow-hidden rounded-lg">
      <CardHeader className="border-b p-0">
        <Link
          aria-label={`View ${product.name} details`}
          href={`/listing/${product.id}`}
        >
          <ProductImage image={thumbnail} />
        </Link>
      </CardHeader>
      <CardContent className="p-2 pb-0">
        <div className="flex justify-between gap-2">
          <h2 className="line-clamp-1 text-base font-medium">{product.name}</h2>
          <div className="flex items-center rounded-md bg-accent px-1 text-sm font-semibold text-accent-foreground">
            {formatPrice(product.price, 0)}
          </div>
        </div>
      </CardContent>
      {store && (
        <CardFooter className="p-2 pt-0">
          <div className="text-xs">
            <span className="text-muted-foreground">by </span>
            <Link href={`/store/${store.handle}`}>{store.name}</Link>
            <span className="text-muted-foreground"> in </span>
            <Link href={`/category/${product.category}`} className="capitalize">
              {product.category}
            </Link>
          </div>
        </CardFooter>
      )}
      <ProductActionButtons
        layout="card"
        product={product}
        className="absolute right-2 top-2 sm:top-0 sm:opacity-0 sm:group-hover:top-2 sm:group-hover:opacity-100"
      />
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
