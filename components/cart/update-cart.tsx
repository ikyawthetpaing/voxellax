"use client";

import { useTransition } from "react";
import { useCartItems } from "@/context/cart-items-context";

import { toggleCartItem } from "@/lib/actions/cart";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import { toast } from "../ui/use-toast";

export function UpdateCart({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  const { setRefresh } = useCartItems();

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
          } catch (error) {
            error instanceof Error
              ? toast({ description: error.message, variant: "destructive" })
              : toast({
                  description: "Something went wrong.",
                  variant: "destructive",
                });
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
