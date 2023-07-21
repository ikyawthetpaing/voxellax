"use client";

import { HTMLAttributes, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RenderStars } from "@/components/listing/render-stars";
import { License } from "@prisma/client";
import Link from "next/link";

interface DetailsCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  licenses: License[];
  totalReviews: number;
  averageRates: number;
  category: string;
  subCategory: string | null;
}

export function DetailsCard({
  licenses,
  category,
  subCategory,
  totalReviews,
  title,
  averageRates,
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
              <span>{formatPrice(licenses[licenseIndex]?.price ?? 0)}</span>
            </div>
          </CardTitle>
          <CardDescription>VAT Included</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>{title}</div>

          {/* licenses */}
          {licenses.length > 0 && (
            <div className="grid gap-2">
              {/* License type */}
              <div className="flex justify-between">
                <h1 className="font-semibold text-sm">License</h1>
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
                      className="flex-1 text-xs cursor-pointer flex justify-between"
                    >
                      <span className="capitalize">{license.type}</span>
                      <div className="flex items-center">
                        {formatPrice(license.price)}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          {totalReviews !== 0 && (
            <div className="flex justify-between">
              <h1 className="font-semibold text-sm">Reviews</h1>
              <div className="flex items-center gap-2">
                <RenderStars size={3} averageRates={averageRates} />
                <div className="text-xs">
                  {totalReviews} {totalReviews > 1 ? "Reviews" : "Review"}
                </div>
              </div>
            </div>
          )}
          <div className="flex min-w-0 justify-between items-center gap-3">
            <h1 className="font-semibold text-sm">Category</h1>
            <div className="text-xs overflow-hidden whitespace-nowrap overflow-ellipsis capitalize">
              <Link href={`/category/${category}`}>{category}</Link>
              <span> / </span>
              <Link href={`/category/${category}/${subCategory}`}>
                {subCategory}
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid gap-3">
          <Button variant="outline">Add to cart</Button>
          {!licenses[licenseIndex]?.price ? (
            <Button>Download now</Button>
          ) : (
            <Button>Buy now</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
