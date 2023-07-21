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
    <Card className="overflow-hidden rounded-lg group relative">
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
        <div className="flex gap-2 justify-between">
          <h1 className="text-base font-medium line-clamp-1">{product.name}</h1>
          <div className="font-semibold flex items-center text-sm bg-accent text-accent-foreground px-1 rounded-md">
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
      <div className="hidden sm:flex absolute top-0 group-hover:top-2 right-2 flex-col gap-2 opacity-0 group-hover:opacity-100 duration-100 animate-in">
        <Button
          variant="secondary"
          size="sm"
          className="gap-2 p-2 rounded-full justify-center"
        >
          <Icons.heart className="w-4 h-4" />
          <span>Like</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="gap-2 p-2 rounded-full justify-center"
        >
          <Icons.shoppingCart className="w-4 h-4" />
          <span>Cart</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="gap-2 p-2 rounded-full justify-center"
        >
          <Icons.bookmark className="w-4 h-4" />
          <span>Save</span>
        </Button>
      </div>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-lg group relative">
      <CardHeader className="border-b p-0">
        <AspectRatio ratio={4 / 3}>
          <Skeleton className="w-full h-full rounded-b-none" />
        </AspectRatio>
      </CardHeader>
      <CardContent className="flex gap-2 p-2 justify-between">
        <Skeleton className="flex-1 h-5" />
        <Skeleton className="w-10 h-5" />
      </CardContent>
      <CardFooter className="sm:hidden p-2 pt-0">
        <Skeleton className="w-full h-9" />
      </CardFooter>
    </Card>
  );
}
