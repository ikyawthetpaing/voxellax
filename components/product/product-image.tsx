"use client";

import { HTMLAttributes, useState } from "react";
import Image from "next/image";
import { ProductImageUploadedFile } from "@/types";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Icons } from "@/components/icons";

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: ProductImageUploadedFile | null;
}
export function ProductImage({ image, className, ...props }: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={cn("overflow-hidden", className)} {...props}>
      <AspectRatio ratio={4 / 3}>
        {image ? (
          <Image
            alt={image.name}
            src={image.url}
            className={cn(
              "object-cover duration-700 ease-in-out group-hover:opacity-75",
              loading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            onLoad={() => setLoading(false)}
            fill
            sizes="(min-width: 0px) 100vw"
            loading="lazy"
            quality={100}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Icons.image className="h-1/3 w-1/3" />
          </div>
        )}
      </AspectRatio>
    </div>
  );
}
