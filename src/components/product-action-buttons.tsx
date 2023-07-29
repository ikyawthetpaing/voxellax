import { HTMLAttributes } from "react";
import { AddToCartButton } from "./add-to-cart-button";
import { AddToCollectionDialog } from "./add-to-collection-dialog";
import { ProductLikeButton } from "./product-like-button";
import { cn } from "@/lib/utils";

interface ProductActionButtonsProps extends HTMLAttributes<HTMLDivElement> {
  productId: string;
  layout: "card" | "listing";
}

export function ProductActionButtons({
  productId,
  layout,
  className,
  ...props
}: ProductActionButtonsProps) {
  return (
    <div
      className={cn("flex flex-col gap-2 duration-100", className)}
      {...props}
    >
      <ProductLikeButton
        layout="icon"
        productId={productId}
        className={cn("rounded-full", {
          "hidden sm:inline-flex": layout === "card",
        })}
      />
      <AddToCartButton
        layout="icon"
        productId={productId}
        className="rounded-full"
      />
      <AddToCollectionDialog
        productId={productId}
        className={cn("rounded-full", {
          "hidden sm:inline-flex": layout === "card",
        })}
      />
    </div>
  );
}
