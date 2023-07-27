"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/products/${productId}/carts`, { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        json ? setIsAdded(true) : setIsAdded(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleOnClick() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products/${productId}/carts`, {
        method: "POST",
      });
      if (!res.ok) {
        if (res.status === 403) {
          router.push("/login");
        } else {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
            duration: 5000,
          });
        }
      } else {
        setIsAdded(!isAdded);
      }
    } catch (error) {
      console.error("Error adding the product to cart:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        duration: 5000,
      });
    }
    setIsLoading(false);
    router.refresh();
  }

  return (
    <Button
      variant={isAdded ? "default" : "secondary"}
      size={layout === "icon" ? "icon" : "sm"}
      className={cn("gap-2", className)}
      aria-label="Add to cart"
      onClick={handleOnClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="h-4 w-4 animate-spin" />
      ) : (
        <Icons.shoppingCart className="h-4 w-4" />
      )}
      {layout === "default" && <span>Add to cart</span>}
    </Button>
  );
}
