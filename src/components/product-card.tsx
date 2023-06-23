"use client";

import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icons } from "./icons";
import { IconButton } from "./icon-button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="relative group flex flex-col gap-3">
      <div className="aspect-4/3 overflow-hidden">
        <Link href={"/product" + "/" + product.id}>
          <Image
            src={product.images[0]}
            alt={product.title}
            width={9999}
            height={9999}
            className={cn(
              "ease-in-out object-cover w-full h-full",
              isLoading ? "blur-md" : "blur-0"
            )}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </Link>
      </div>

      <div>
        <div className="flex justify-between gap-3">
          <h1 className="flex-1 overflow-hidden whitespace-nowrap overflow-ellipsis font-medium">
            {product.title}
          </h1>
          <div className="font-semibold flex items-center text-sm bg-accent text-accent-foreground px-1 rounded-md">
            <Icons.dollarSign className="w-4 h-4" />
            <span>
              {product.license && product.license.length > 0
                ? product.license[0].price
                : 0}
            </span>
          </div>
        </div>

        <div>
          <span className="text-xs">by Voxellax in Ebook</span>
        </div>
      </div>

      <div className="absolute top-0 group-hover:top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 duration-100 animate-in">
        <IconButton variant="secondary" size="sm">
          <Icons.heart className="w-4 h-4" />
        </IconButton>
        <IconButton variant="secondary" size="sm">
          <Icons.shoppingCart className="w-4 h-4" />
        </IconButton>
      </div>
    </div>
  );
}
