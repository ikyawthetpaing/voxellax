"use client";

import { HTMLAttributes, useState } from "react";
// import { License } from "@prisma/client";
import Link from "next/link";

import { License } from "@/types/dev";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RenderStars } from "@/components/listing/render-stars";

// import { AddToCartButton } from "../add-to-cart-button";

interface DetailsCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  price: number;
  // licenses: License[];
  totalReviews: number;
  averageRates: number;
  category: string;
  subCategory: string | null;
  productId: string;
}

export function DetailsCard({
  // licenses,
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
  const [licenseIndex, setLicenseIndex] = useState<number>(0);

  return (
    <div className={className} {...props}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div>Price</div>
            <div className="flex items-center">
              {/* <span>{formatPrice(licenses[licenseIndex]?.price, 2)}</span> */}
              <span>{formatPrice(price, 2)}</span>
            </div>
          </CardTitle>
          <CardDescription>VAT Included</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>{title}</div>

          {/* licenses */}
          {/* {licenses.length > 0 && (
            <div className="grid gap-2">
              <div className="flex justify-between">
                <h1 className="text-sm font-semibold">License</h1>
                <span className="text-xs capitalize">
                  {licenses[licenseIndex].type}
                </span>
              </div>

              <RadioGroup defaultValue={licenses[0].type}>
                {licenses.map((license, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem
                      value={license.type}
                      id={`radio-${index}`}
                      onClick={() => setLicenseIndex(index)}
                    />
                    <Label
                      htmlFor={`radio-${index}`}
                      className="flex flex-1 cursor-pointer justify-between text-xs"
                    >
                      <span className="capitalize">{license.type}</span>
                      <div className="flex items-center">
                        {formatPrice(license.price, 2)}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )} */}
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
          {/* <AddToCartButton productId={productId} /> */}
          <Button variant="outline">Add to cart</Button>
          {!price ? <Button>Download now</Button> : <Button>Buy now</Button>}
        </CardFooter>
      </Card>
    </div>
  );
}
