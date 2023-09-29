"use client";

import { useTransition } from "react";

import { toggleCartItem } from "@/lib/actions/cart";
import { catchError } from "@/lib/utils";
import { useUserCartItems } from "@/context/user-cart-items";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function UpdateCart({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  const { setRefresh } = useUserCartItems();

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-8 w-8"
      onClick={() => {
        startTransition(async () => {
          try {
            await toggleCartItem(productId);
            setRefresh(true);
          } catch (err) {
            catchError(err);
          }
        });
      }}
      disabled={isPending}
    >
      <Icons.trash className="h-3 w-3" aria-hidden="true" />
      <span className="sr-only">Delete item</span>
    </Button>
  );
}
