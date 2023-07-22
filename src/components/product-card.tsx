import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";
import { Product } from "@prisma/client";
import { db } from "@/lib/db";
import { siteConfig } from "@/config/site";

interface ProductCardProps {
  product: Product;
}

export async function ProductCard({ product }: ProductCardProps) {
  const store = await db.store.findFirst({
    where: { id: product.storeId || undefined },
  });
  const license = await db.license.findFirst({
    where: { productId: product.id },
    select: { price: true },
  });
  const images = await db.file.findMany({ where: { productImagesId: product.id } });

  return (
    <Card className="group relative overflow-hidden rounded-lg">
      <CardHeader className="border-b p-0">
        <AspectRatio ratio={4 / 3}>
          <Link
            aria-label={`View ${product.name} details`}
            href={`/listing/${product.id}`}
          >
            <Image
              src={images[0]?.url ?? siteConfig.placeholderImageUrl}
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
            {formatPrice(license?.price ?? 0, 0)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-2 pt-0">
      <div className="text-xs">
          <span className="text-foreground/75">by </span>
          <Link href={`/store/${product.storeId}`}>{store?.name}</Link>
          <span className="text-foreground/75"> in </span>
          <Link href={`/category/${product.category}`} className="capitalize">{product.category}</Link>
        </div>
        {/* <Button variant="outline" size="sm" className="w-full flex gap-2">
          <Icons.shoppingCart className="w-4 h-4" />
          Add to cart
        </Button> */}
      </CardFooter>
      <div className="absolute right-2 top-0 hidden flex-col gap-2 opacity-0 animate-in duration-100 group-hover:top-2 group-hover:opacity-100 sm:flex">
        <Button
          variant="secondary"
          size="sm"
          className="justify-center gap-2 rounded-full p-2"
        >
          <Icons.heart className="h-4 w-4" />
          <span>Like</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="justify-center gap-2 rounded-full p-2"
        >
          <Icons.shoppingCart className="h-4 w-4" />
          <span>Cart</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="justify-center gap-2 rounded-full p-2"
        >
          <Icons.bookmark className="h-4 w-4" />
          <span>Save</span>
        </Button>
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
