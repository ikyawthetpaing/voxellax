"use client";

import { useEffect, useState, useTransition } from "react";

import { isUserLiked, toggleLike } from "@/lib/actions/like";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

interface ProductLikeButtonProps extends ButtonProps {
  productId: string;
  layout?: "icon" | "default";
}

export function ProductLikeButton({
  productId,
  layout = "default",
  className,
  ...props
}: ProductLikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      setIsLiked(await isUserLiked(productId));
    });
  }, [productId]);

  async function handleOnClick() {
    startTransition(async () => {
      try {
        setIsLiked(await toggleLike(productId));
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
      variant={isLiked ? "default" : "secondary"}
      size={layout === "icon" ? "icon" : "sm"}
      className={cn("gap-2", className)}
      aria-label="Add to cart"
      onClick={handleOnClick}
      disabled={isPending}
      {...props}
    >
      {isPending ? (
        <Icons.spinner className="h-4 w-4 animate-spin" />
      ) : (
        <Icons.heart className="h-4 w-4" />
      )}
      {layout === "default" && <span>Like</span>}
    </Button>
  );
}
