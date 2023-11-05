"use client";

import { useEffect, useState, useTransition } from "react";

import { toggleLike } from "@/lib/actions/like";
import { catchError } from "@/lib/utils";
import { useUserLikes } from "@/context/user-likes";
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
  const { data } = useUserLikes();

  useEffect(() => {
    const item = data.find((item) => item.productId === productId);
    setIsLiked(!!item);
  }, [data, productId]);

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
      variant={isLiked ? "default" : "outline"}
      size="icon"
      className="rounded-full"
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
