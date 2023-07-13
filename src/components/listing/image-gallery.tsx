"use client";

import Image from "next/image";
import { HTMLAttributes, useState } from "react";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "../ui/button";
// import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Image as ImageSchema } from "@prisma/client";

interface ImageGalleryProps extends HTMLAttributes<HTMLDivElement> {
  images: ImageSchema[];
}

export function ImageGallery({
  images,
  className,
  ...props
}: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  return (
    <div className={cn("grid gap-3", className)} {...props}>
      <AspectRatio
        ratio={4 / 3}
        className="rounded-lg overflow-hidden relative group border"
      >
        <Image
          src={images[currentImageIndex].url}
          alt={images[currentImageIndex].id}
          fill
          className="object-cover"
          loading="lazy"
        />
        <div className="w-full absolute top-1/2 left-0 flex justify-between px-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-100 animate-in">
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
            <Icons.chevronLeft className="w-5 h-5" />
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
            <Icons.chevronRight className="w-5 h-5" />
          </Button>
        </div>
      </AspectRatio>
      <div className="flex gap-3 w-full overflow-x-scroll hide-scrollbar">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "flex w-20 md:w-24 overflow-hidden rounded-lg border border-background flex-shrink-0",
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
