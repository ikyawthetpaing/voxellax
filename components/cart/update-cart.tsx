"use client";

import { useContext, useTransition } from "react";
import { CartItemsContext } from "@/context/cart-items-context";

import { cartToggleAction } from "@/lib/actions/cart";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

import { toast } from "../ui/use-toast";

export function UpdateCart({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  const cartItemsContext = useContext(CartItemsContext);

  return (
    // <div className="flex items-center space-x-1">
    <Button
      variant="outline"
      size="icon"
      className="h-8 w-8"
      onClick={() => {
        startTransition(async () => {
          try {
            await cartToggleAction(productId);
            cartItemsContext?.setRefresh(true);
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
    // </div>
  );
}
