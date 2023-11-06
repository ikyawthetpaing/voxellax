"use client";

import { HTMLAttributes, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Product } from "@/db/schema";

import { addPurchase, getPurchase } from "@/lib/actions/purchase";
import { downloadProductFiles, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckoutDialog } from "@/components/dialogs/checkout-dialog";
import { RenderStars } from "@/components/listing/render-stars";
import { AddToCartButton } from "@/components/product/add-to-cart-button";

interface DetailsCardProps extends HTMLAttributes<HTMLDivElement> {
  totalReviews: number;
  averageRate: number;
  product: Product;
}

export function DetailsCard({
  averageRate,
  totalReviews,
  product,
  className,
  ...props
}: DetailsCardProps) {
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    const fetchPurchaseStatus = async () => {
      try {
        const value = await getPurchase({ productId: product.id });
        setPurchased(!!value);
      } catch (error) {
        console.error("Error fetching purchase status:", error);
      }
    };

    fetchPurchaseStatus();
  }, [product.id]);

  const onClickDownload = async () => {
    await downloadProductFiles(product.files);

    if (!purchased) {
      try {
        await addPurchase({
          cost: product.price,
          productId: product.id,
        });
        setPurchased(true);
      } catch (error) {
        toast.error(
          "Oops! We encountered an issue while processing your purchase. Please try again later or contact support for assistance."
        );
        console.error("Error purchasing the product:", error);
      }
    }
  };

  return (
    <div className={className} {...props}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Price</span>
            <span>{formatPrice(product.price, 2)}</span>
          </CardTitle>
          <CardDescription>VAT Included</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {totalReviews !== 0 && (
            <div className="flex justify-between">
              <h1 className="text-sm font-semibold">Reviews</h1>
              <div className="flex items-center gap-2">
                <RenderStars size={3} averageRate={averageRate} />
                <p className="text-xs">
                  {totalReviews} {totalReviews > 1 ? "Reviews" : "Review"}
                </p>
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
          <AddToCartButton
            productId={product.id}
            disabled={product.price === 0 || purchased}
          />
          {!product.price ? (
            <Button onClick={onClickDownload}>Download now</Button>
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
