"use client";

import Image from "next/image";
import { HTMLAttributes, useState } from "react";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "../ui/button";
import { File } from "@prisma/client";
import { siteConfig } from "@/config/site";
import { ProductActionButtons } from "../product-action-buttons";

interface ImageGalleryProps extends HTMLAttributes<HTMLDivElement> {
  images: File[];
  productId: string;
}

export function ImageGallery({
  images,
  productId,
  className,
  ...props
}: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  return (
    <div className={cn("grid gap-3", className)} {...props}>
      <AspectRatio
        ratio={4 / 3}
        className="group relative overflow-hidden rounded-lg border"
      >
        <Image
          src={images[currentImageIndex]?.url ?? siteConfig.placeholderImageUrl}
          alt={images[currentImageIndex]?.id ?? ""}
          fill
          className="object-cover"
          loading="lazy"
          quality={100}
          sizes="100vw"
          // placeholder="blur"
        />
        <ProductActionButtons
          layout="listing"
          productId={productId}
          className="absolute right-2 top-2 sm:right-4 sm:top-4 sm:opacity-0 sm:group-hover:opacity-100"
        />
        <div className="absolute left-0 top-1/2 hidden w-full -translate-y-1/2 justify-between px-2 opacity-0 animate-in duration-100 group-hover:opacity-100 sm:flex sm:px-4">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={() =>
              setCurrentImageIndex((currentImageIndex) => {
                let newIndex = currentImageIndex - 1;
                if (newIndex < 0) {
                  newIndex = images.length - 1;
                }
                return newIndex;
              })
            }
          >
            <Icons.chevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={() =>
              setCurrentImageIndex((currentImageIndex) => {
                let newIndex = currentImageIndex + 1;
                if (newIndex >= images.length) {
                  newIndex = 0;
                }
                return newIndex;
              })
            }
          >
            <Icons.chevronRight className="h-5 w-5" />
          </Button>
        </div>
      </AspectRatio>
      <div className="hide-scrollbar flex w-full gap-3 overflow-x-scroll">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "flex w-20 shrink-0 overflow-hidden rounded-lg border border-background md:w-24",
              { "border-primary": index === currentImageIndex }
            )}
            onMouseOver={() => setCurrentImageIndex(index)}
          >
            <AspectRatio ratio={4 / 3}>
              <Image
                src={image.url}
                alt={image.id}
                fill
                className="object-cover"
                loading="lazy"
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
}
