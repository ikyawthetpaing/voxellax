import { HTMLAttributes } from "react";
import Image from "next/image";
import { ProductImageUploadedFile } from "@/types";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Icons } from "@/components/icons";

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: ProductImageUploadedFile | null;
}
export function ProductImage({ image, className, ...props }: Props) {
  return (
    <div className={cn("overflow-hidden", className)} {...props}>
      <AspectRatio ratio={4 / 3}>
        {image ? (
          <Image
            src={image.url}
            alt={image.name}
            fill
            className="object-cover"
            loading="lazy"
            w-24
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
