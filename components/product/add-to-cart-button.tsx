"use client";

import { useEffect, useState, useTransition } from "react";

import { toggleCartItem } from "@/lib/actions/cart";
import { getCurrentUserPurchase } from "@/lib/actions/purchase";
import { catchError, cn } from "@/lib/utils";
import { useUserCartItems } from "@/context/user-cart-items";
import { Button, ButtonProps } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface AddToCartButtonProps extends ButtonProps {
  productId: string;
  productPrice: number;
  purchased: boolean;
  layout?: "icon" | "default";
}

export function AddToCartButton({
  productId,
  productPrice,
  purchased,
  layout = "default",
  className,
  ...props
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { data, setRefresh } = useUserCartItems();

  const disabled = isPending || isPurchased || productPrice === 0 || purchased;

  useEffect(() => {
    const item = data.find((item) => item.productId === productId);
    setIsAdded(!!item);
  }, [data, productId]);

  useEffect(() => {
    getCurrentUserPurchase({ productId: productId }).then((value) =>
      setIsPurchased(!!value)
    );
  }, [productId]);

  const handleOnClick = async () => {
    startTransition(async () => {
      try {
        await toggleCartItem(productId);
        setRefresh(true);
      } catch (err) {
        catchError(err);
      }
    });
  };

  return (
    <Button
      variant={isAdded ? "default" : "outline"}
      size={layout === "icon" ? "icon" : "default"}
      className={cn("gap-2", className, { "rounded-full": layout === "icon" })}
      aria-label="Add to cart"
      onClick={handleOnClick}
      disabled={disabled}
      {...props}
    >
      {isPending ? (
        <Icons.spinner className="h-4 w-4 animate-spin" />
      ) : (
        <Icons.cart className="h-4 w-4" />
      )}
      {layout === "default"
        ? isAdded
          ? "Remove from cart"
          : "Add to cart"
        : null}
    </Button>
  );
}
