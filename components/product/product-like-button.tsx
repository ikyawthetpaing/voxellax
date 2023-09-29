"use client";

import { useEffect, useState, useTransition } from "react";

import { isUserLiked, toggleLike } from "@/lib/actions/like";
import { catchError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface ProductLikeButtonProps {
  productId: string;
}

export function ProductLikeButton({
  productId,
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
        const _isLiked = await toggleLike(productId);
        setIsLiked(_isLiked);
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Button
      variant={isLiked ? "default" : "secondary"}
      size="icon"
      className="rounded-full"
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
    </Button>
  );
}
