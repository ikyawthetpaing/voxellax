"use client";

import { HTMLAttributes, useState } from "react";

import { Product } from "@/db/schema";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ProductActionButtons } from "@/components/product/product-action-buttons";

import { ProductImage } from "../product/product-image";

interface ImageGalleryProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}

export function ImageGallery({
  product,
  className,
  ...props
}: ImageGalleryProps) {
  const { images } = product;
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const currentImage =
    images && images.length ? images[currentImageIndex] : null;
  return (
    <div className={cn("grid gap-3", className)} {...props}>
      <div className="group relative overflow-hidden rounded-lg border">
        <ProductImage image={currentImage} />
        <ProductActionButtons
          layout="listing"
          product={product}
          className="absolute right-2 top-2 sm:right-4 sm:top-4 sm:opacity-0 sm:group-hover:opacity-100"
        />
        {images && (
          <div className="absolute left-0 top-1/2 hidden w-full -translate-y-1/2 justify-between px-2 opacity-0 duration-100 animate-in group-hover:opacity-100 sm:flex sm:px-4">
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
        )}
      </div>
      {images && (
        <div className="hide-scrollbar flex w-full gap-3 overflow-x-scroll">
          {images.map((image, index) => (
            <ProductImage
              image={image}
              key={index}
              className={cn(
                "flex w-20 shrink-0  border border-background p-[1px] md:w-24",
                { "border-primary": index === currentImageIndex }
              )}
              onMouseOver={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
