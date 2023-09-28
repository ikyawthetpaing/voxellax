"use client";

import { HTMLAttributes } from "react";
import Link from "next/link";

import { Product } from "@/db/schema";

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

import { CheckoutDialog } from "../dialogs/checkout-dialog";

interface DetailsCardProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}

export function DetailsCard({
  product,
  className,
  ...props
}: DetailsCardProps) {
  // just for dev
  let totalReviews = 13;
  const averageRates = 4.5;

  return (
    <div className={className} {...props}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div>Price</div>
            <div className="flex items-center">
              <span>{formatPrice(product.price, 2)}</span>
            </div>
          </CardTitle>
          <CardDescription>VAT Included</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
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
              <Link href={`/category/${product.category}`}>
                {product.category}
              </Link>

              {product.subcategory && (
                <>
                  <span>{" / "}</span>
                  <Link
                    href={`/category/${product.category}/${product.subcategory}`}
                  >
                    {product.subcategory}
                  </Link>
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid gap-3">
          <AddToCartButton productId={product.id} />
          {!product.price ? (
            <Button>Download now</Button>
          ) : (
            <CheckoutDialog
              products={[product]}
              trigger={<Button>Buy now</Button>}
            />
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
