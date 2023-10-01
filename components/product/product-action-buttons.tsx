import { HTMLAttributes } from "react";

import { Product } from "@/db/schema";

import { cn } from "@/lib/utils";
import { AddToCollectionDialog } from "@/components/dialogs/add-to-collection-dialog";
import { ProductShareDialog } from "@/components/dialogs/product-share-dialog";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductLikeButton } from "@/components/product/product-like-button";

interface ProductActionButtonsProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
  layout: "card" | "listing";
}

export function ProductActionButtons({
  product,
  layout,
  className,
  ...props
}: ProductActionButtonsProps) {
  return (
    <div
      className={cn("flex flex-col gap-2 duration-100", className)}
      {...props}
    >
      <div className={cn({ "max-sm:hidden": layout === "card" })}>
        <ProductLikeButton productId={product.id} />
      </div>
      <div>
        <AddToCartButton layout="icon" productId={product.id} />
      </div>
      <div
        className={cn({
          "max-sm:hidden md:hidden lg:block": layout === "card",
        })}
      >
        <AddToCollectionDialog productId={product.id} />
      </div>
      <div
        className={cn({
          "max-sm:hidden md:hidden xl:block": layout === "card",
        })}
      >
        <ProductShareDialog product={product} />
      </div>
    </div>
  );
}
