import { HTMLAttributes } from "react";
import Link from "next/link";

import { Product } from "@/db/schema";

import { cn, formatPrice, getProductThumbnailImage } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ProductImage } from "@/components/product/product-image";
import { UpdateCart } from "@/components/update-cart";

interface Props extends HTMLAttributes<HTMLDivElement> {
  cartProducts: Product[];
}

export function CartItemProducts({ cartProducts, className, ...props }: Props) {
  return (
    <div
      className={cn("flex flex-1 flex-col gap-4 overflow-hidden", className)}
      {...props}
    >
      {cartProducts.map(({ id, name, category, images, price }, index) => {
        const thumbnail = getProductThumbnailImage(images);

        return (
          <div key={index} className="space-y-4">
            <div className="flex gap-4">
              <Link href={`/listing/${id}`}>
                <ProductImage
                  image={thumbnail}
                  className="w-24 rounded-lg border"
                />
              </Link>
              <div className="flex flex-1 flex-col gap-1 self-start text-sm">
                <Link href={`/listing/${id}`} className="line-clamp-1">
                  {name}
                </Link>
                <span className="line-clamp-1 text-muted-foreground">
                  {formatPrice(price, 2)}
                </span>
                <Link
                  href={`/category/${category}`}
                  className="line-clamp-1 text-xs capitalize text-muted-foreground"
                >
                  {`${category}`}
                </Link>
              </div>
              <UpdateCart productId={id} />
            </div>
            {index !== cartProducts.length - 1 && <Separator />}
          </div>
        );
      })}
    </div>
  );
}
