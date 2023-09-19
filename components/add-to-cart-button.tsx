"use client";

import { useContext, useEffect, useState, useTransition } from "react";
import { CartItemsContext } from "@/context/cart-items-context";

import { isUserAddedCartItem, toggleCartItem } from "@/lib/actions/cart";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

interface AddToCartButtonProps extends ButtonProps {
  productId: string;
  layout?: "icon" | "default";
}

export function AddToCartButton({
  productId,
  layout = "default",
  className,
  ...props
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isPending, startTransition] = useTransition();
  const cartItemsContext = useContext(CartItemsContext);

  useEffect(() => {
    const item = cartItemsContext?.data.find(
      (item) => item.productId === productId
    );
    setIsAdded(!!item);
  }, [cartItemsContext?.data, productId]);

  async function handleOnClick() {
    startTransition(async () => {
      try {
        await toggleCartItem(productId);
        cartItemsContext?.setRefresh(true);
      } catch (err) {
        console.error(err);
        toast({
          description: "Something went wrong, please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Button
      variant={isAdded ? "default" : "secondary"}
      size={layout === "icon" ? "icon" : "default"}
      className={cn("gap-2", className)}
      aria-label="Add to cart"
      onClick={handleOnClick}
      disabled={isPending}
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
