"use client";

import { HTMLAttributes } from "react";
import Link from "next/link";

import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { RenderStars } from "@/components/listing/render-stars";

interface DetailsCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  price: number;
  totalReviews: number;
  averageRates: number;
  category: string;
  subCategory: string | null;
  productId: string;
}

export function DetailsCard({
  price,
  category,
  subCategory,
  totalReviews,
  title,
  averageRates,
  productId,
  className,
  ...props
}: DetailsCardProps) {
  return (
    <div className={className} {...props}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div>Price</div>
            <div className="flex items-center">
              <span>{formatPrice(price, 2)}</span>
            </div>
          </CardTitle>
          <CardDescription>VAT Included</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>{title}</div>
          {totalReviews !== 0 && (
            <div className="flex justify-between">
              <h1 className="text-sm font-semibold">Reviews</h1>
              <div className="flex items-center gap-2">
                <RenderStars size={3} averageRates={averageRates} />
                <div className="text-xs">
                  {totalReviews} {totalReviews > 1 ? "Reviews" : "Review"}
                </div>
              </div>
            </div>
          )}
          <div className="flex min-w-0 items-center justify-between gap-3">
            <h1 className="text-sm font-semibold">Category</h1>
            <div className="truncate text-xs capitalize">
              <Link href={`/category/${category}`}>{category}</Link>
              <span> / </span>
              <Link href={`/category/${category}/${subCategory}`}>
                {subCategory}
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid gap-3">
          <AddToCartButton productId={productId} />
          {!price ? <Button>Download now</Button> : <Button>Buy now</Button>}
        </CardFooter>
      </Card>
    </div>
  );
}
