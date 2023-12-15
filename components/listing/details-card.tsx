import { HTMLAttributes } from "react";
import Link from "next/link";

import { Product } from "@/db/schema";

import { getCurrentUserPurchase } from "@/lib/actions/purchase";
import { cn, formatPrice } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { ProductFilesDownloadButton } from "@/components/product-files-download-button";
import { AddToCartButton } from "@/components/product/add-to-cart-button";

interface DetailsCardProps extends HTMLAttributes<HTMLDivElement> {
  totalReviews: number;
  averageRate: number;
  product: Product;
}

export async function DetailsCard({
  averageRate,
  totalReviews,
  product,
  className,
  ...props
}: DetailsCardProps) {
  const isPurchased = !!(await getCurrentUserPurchase({
    productId: product.id,
  }));

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
          <div className="flex justify-between">
            <h1 className="text-sm font-semibold">Reviews</h1>
            <div className="flex items-center gap-2">
              <RenderStars size={3} averageRate={averageRate} />
              <p className="text-xs">
                {totalReviews} {totalReviews > 1 ? "Reviews" : "Review"}
              </p>
            </div>
          </div>
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
            productPrice={product.price}
            purchased={isPurchased}
            productId={product.id}
          />
          {!product.price ? (
            <ProductFilesDownloadButton
              files={product.files}
              className={cn(buttonVariants())}
            >
              Download now
            </ProductFilesDownloadButton>
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
