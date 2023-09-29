import { HTMLAttributes } from "react";

import { Product } from "@/db/schema";

import { cn } from "@/lib/utils";

import { AddToCollectionDialog } from "../dialogs/add-to-collection-dialog";
import { ProductShareDialog } from "../dialogs/product-share-dialog";
import { AddToCartButton } from "./add-to-cart-button";
import { ProductLikeButton } from "./product-like-button";

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
      <ProductLikeButton productId={product.id} />
      <div className="hidden sm:flex sm:flex-col sm:gap-2">
        <AddToCartButton layout="icon" productId={product.id} />
        <AddToCollectionDialog productId={product.id} />
        <ProductShareDialog product={product} />
      </div>
    </div>
  );
}
