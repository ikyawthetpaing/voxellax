import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";
import { File, Product, Store } from "@prisma/client";
import { siteConfig } from "@/config/site";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductLikeButton } from "@/components/product-like-button";
import { AddToCollectionDialog } from "./add-to-collection-dialog";
interface ProductCardProps {
  product: Pick<Product, "id" | "name" | "category">;
  store: Pick<Store, "id" | "name">;
  price: number;
  thumbnail: Pick<File, "url"> | null;
}

export function ProductCard({
  product,
  store,
  price,
  thumbnail,
}: ProductCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-lg">
      <CardHeader className="border-b p-0">
        <AspectRatio ratio={4 / 3}>
          <Link
            aria-label={`View ${product.name} details`}
            href={`/listing/${product.id}`}
          >
            <Image
              src={thumbnail?.url ?? siteConfig.placeholderImageUrl}
              alt={product.name}
              fill
              className="object-cover"
              loading="lazy"
            />
          </Link>
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-2 pb-0">
        <div className="flex justify-between gap-2">
          <h1 className="line-clamp-1 text-base font-medium">{product.name}</h1>
          <div className="flex items-center rounded-md bg-accent px-1 text-sm font-semibold text-accent-foreground">
            {formatPrice(price, 0)}
          </div>
        </div>
      </CardContent>
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
      <div className="absolute right-2 top-2 flex flex-col gap-2 duration-100 sm:top-0 sm:opacity-0 sm:group-hover:top-2 sm:group-hover:opacity-100">
        <ProductLikeButton
          layout="icon"
          productId={product.id}
          className="hidden rounded-full sm:inline-flex"
        />
        <AddToCartButton
          layout="icon"
          productId={product.id}
          className="rounded-full"
        />
        <AddToCollectionDialog productId={product.id} />
      </div>
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
