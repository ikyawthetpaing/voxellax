"use client";

import { Product, Review } from "@/types";
import Image from "next/image";
import { HTMLAttributes, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/icon-button";
import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { siteConfig } from "@/config/site";
import { Products } from "./products";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-10 lg:gap-20">
      <div className="grid lg:flex gap-10 lg:gap-6">
        <div className="flex-1 flex flex-col gap-10">
          {/* Image and gallery code */}
          <ProductImageGallery product={product} />
          <div className="hidden lg:grid">
            {product.reviews && <ProductReviews reviews={product.reviews} />}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <ProductListings product={product} />
          <ProductDescriptions />
          {/* {product.reviews && <ProductReviews reviews={product.reviews} className="lg:hidden"/>} */}
        </div>
      </div>
      <div className="space-y-3">
        <h1 className="text-xl font-medium capitalize">You may also like</h1>
        <Products />
      </div>
      <div className="lg:hidden">
        {product.reviews && <ProductReviews reviews={product.reviews} />}
      </div>
    </div>
  );
}

function ProductImageGallery({ product }: { product: Product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  return (
    <div className="grid gap-3">
      <div className="aspect-4/3 rounded-lg overflow-hidden relative group border">
        <Image
          src={product.images[currentImageIndex]}
          alt={product.title}
          width={9999}
          height={9999}
          className="object-cover w-full h-full"
        />
        <div className="w-full absolute top-1/2 left-0 flex justify-between px-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-100 animate-in">
          <IconButton
            variant="secondary"
            size="sm"
            onClick={() =>
              setCurrentImageIndex((currentImageIndex) => {
                let newIndex = currentImageIndex - 1;
                if (newIndex < 0) {
                  newIndex = product.images.length - 1;
                }
                return newIndex;
              })
            }
          >
            <Icons.chevronLeft className="w-5 h-5" />
          </IconButton>
          <IconButton
            variant="secondary"
            size="sm"
            onClick={() =>
              setCurrentImageIndex((currentImageIndex) => {
                let newIndex = currentImageIndex + 1;
                if (newIndex >= product.images.length) {
                  newIndex = 0;
                }
                return newIndex;
              })
            }
          >
            <Icons.chevronRight className="w-5 h-5" />
          </IconButton>
        </div>
      </div>
      <div className="flex gap-3 w-full overflow-x-scroll">
        {product.images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "aspect-4/3 w-20 md:w-24 overflow-hidden rounded-lg border-2 border-background flex-shrink-0",
              { "border-primary": index === currentImageIndex }
            )}
            onMouseOver={() => setCurrentImageIndex(index)}
          >
            <Image
              src={image}
              alt={product.title + index}
              width={9999}
              height={9999}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductListings({ product }: { product: Product }) {
  const [currentLicenseIndex, setCurrentLicenseIndex] = useState<number>(0);
  const reviewStars = Array.from({ length: 5 }, (_, i) => i);

  let totalRates = 0;
  product.reviews?.forEach((review) => {
    totalRates += review.rate;
  });
  const averageRates =
    product.reviews && product.reviews.length > 0
      ? Math.floor(totalRates / product.reviews.length)
      : 0;
  return (
    <div className="lg:w-96">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>Price</span>
            <span>
              {product.license && product.license.length > 0
                ? product.license[currentLicenseIndex].price
                : 0}{" "}
              {product.currency.toUpperCase()}
            </span>
          </CardTitle>
          <CardDescription>VAT Included</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>{product.title}</div>

          {product.license && (
            <div className="grid gap-2">
              {/* License type */}
              <div className="flex justify-between">
                <h1 className="font-semibold text-sm">License</h1>
                <span className="text-xs">
                  {product.license[currentLicenseIndex].type}
                </span>
              </div>

              <RadioGroup defaultValue={product.license[0].type}>
                {product.license.map((license, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem
                      value={license.type}
                      id={`radio-${index}`}
                      onClick={() => setCurrentLicenseIndex(index)}
                    />
                    <Label
                      htmlFor={`radio-${index}`}
                      className="flex-1 text-xs cursor-pointer flex justify-between"
                    >
                      <span>{license.type}</span>
                      <span>
                        {license.price} {product.currency.toUpperCase()}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {product.reviews && (
            <div className="flex justify-between">
              <h1 className="font-semibold text-sm">Reviews</h1>
              <div className="flex items-center gap-2">
                <span className="flex">
                  {/* Render review stars */}
                  {reviewStars.map((i) => (
                    <Icons.star
                      key={i}
                      className={cn("w-3 h-3", {
                        "text-red-500": i < averageRates,
                      })}
                    />
                  ))}
                </span>
                <span className="text-xs">
                  {product.reviews.length}{" "}
                  {product.reviews?.length > 1 ? "Reviews" : "Review"}
                </span>
              </div>
            </div>
          )}
          <div className="flex min-w-0 justify-between items-center gap-3">
            <h1 className="font-semibold text-sm">Categories</h1>
            <div className="text-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
              {product.categories.join(" / ")}
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid gap-3">
          <Button variant="outline">Add to cart</Button>
          <Button>Buy now</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function ProductDescriptions() {
  return (
    <div className="lg:w-96">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Description</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Highlights</AccordionTrigger>
          <AccordionContent className="flex flex-wrap">
            Yes. It comes with default styles that matches the other components'
            aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Delivery</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-6">
              <h1 className="text-xl">Instant Download</h1>
              <p className="opacity-75">
                Your files will be available to download once payment is
                confirmed. Here's how.
              </p>
              <p>
                Instant download items don’t accept returns, exchanges or
                cancellations. Please contact the seller about any problems with
                your order.
              </p>
              <div className="flex items-center gap-3">
                <Icons.heartHandshake className="w-12 h-12 flex-shrink-0" />
                <p className="text-xs">
                  <span className="font-semibold">Purchase Protection:</span>{" "}
                  Shop confidently on {siteConfig.name} knowing if something
                  goes wrong with an order, we've got your back for all eligible
                  purchases — see program terms
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

interface ProductReviewsProps extends HTMLAttributes<HTMLDivElement> {
  reviews: Review[];
}

function groupNumbers(numbers: number[], groupSize: number): number[][] {
  const groups: number[][] = [];

  for (let i = 0; i < numbers.length; i += groupSize) {
    const group = numbers.slice(i, i + groupSize);
    groups.push(group);
  }

  return groups;
}

function ProductReviews({ reviews, className, ...props }: ProductReviewsProps) {
  const [currentReviewsGroup, setCurrentReviewsGroup] = useState(0);

  const rates = Array.from({ length: 5 }, (_, i) => i);

  let totalRates = 0;
  reviews.forEach((review) => {
    totalRates += review.rate;
  });
  const averageRates =
    reviews && reviews.length > 0 ? Math.floor(totalRates / reviews.length) : 0;

  const totalReviewsPerGroup = 3;
  const reviewGroups = groupNumbers(
    Array.from({ length: reviews.length }, (_, i) => i),
    totalReviewsPerGroup
  );

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid gap-2 items-center">
        <h1>Reviews ({reviews.length})</h1>
        <hr />
      </div>
      <div className="grid gap-6">
        {reviewGroups[currentReviewsGroup].map((index) => (
          <div key={index}>
            <div className="flex gap-3">
              <Avatar className="w-9 h-9 flex-shrink-0">
                {/* <AvatarImage
              src={user.image?.toString()}
              alt={user.name?.toString()}
            /> */}
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <h1 className="font-semibold">Jon Doe . </h1>
                  <div className="flex items-center gap-2 opacity-75">
                    <Icons.calendar className="w-3 h-3" />
                    <span className="text-xs">Apr 24, 2022</span>
                  </div>
                </div>
                <div className="flex">
                  {/* Render review stars */}
                  {rates.map((i) => (
                    <Icons.star
                      key={i}
                      className={cn("w-5 h-5", {
                        "text-red-500": i < reviews[index].rate,
                      })}
                    />
                  ))}
                </div>
                <p>{reviews[index].message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 mx-auto">
        <IconButton
          size="sm"
          disabled={currentReviewsGroup === 0}
          onClick={() =>
            setCurrentReviewsGroup((currentReviewsGroup) => {
              let n = currentReviewsGroup - 1;
              return n;
            })
          }
        >
          <Icons.chevronLeft className="w-4 h-4" />
        </IconButton>
        {/* {reviewGroups.map((_value, index) => (
          <>
          {!(index === 0 || index === 1 || index === reviewGroups.length - 1 || index === reviewGroups.length - 2) ? <div>...</div> : (          <IconButton
            key={index}
            size="sm"
            disabled={currentReviewsGroup === index}
            onClick={() => setCurrentReviewsGroup(index)}
          >
            {index + 1}
          </IconButton>)}
          </>
        ))} */}
        <IconButton size="sm" onClick={() => setCurrentReviewsGroup(0)}>
          1
        </IconButton>
        {!(currentReviewsGroup === 0 || currentReviewsGroup === 1) && (
          <div>...</div>
        )}
        {currentReviewsGroup === 0 || currentReviewsGroup === 1 ? (
          <IconButton size="sm" onClick={() => setCurrentReviewsGroup(1)}>
            2
          </IconButton>
        ) : currentReviewsGroup === reviewGroups.length - 1 ? null : (
          <IconButton
            size="sm"
            onClick={() => setCurrentReviewsGroup(currentReviewsGroup)}
          >
            {currentReviewsGroup + 1}
          </IconButton>
        )}
        {currentReviewsGroup === reviewGroups.length - 1 && (
          <IconButton
            size="sm"
            onClick={() => setCurrentReviewsGroup(reviewGroups.length - 2)}
          >
            {reviewGroups.length - 2 + 1}
          </IconButton>
        )}
        {!(
          currentReviewsGroup === reviewGroups.length - 1 ||
          currentReviewsGroup === reviewGroups.length - 2
        ) && <div>...</div>}
        <IconButton
          size="sm"
          onClick={() => setCurrentReviewsGroup(reviewGroups.length - 1)}
        >
          {reviewGroups.length}
        </IconButton>
        <IconButton
          size="sm"
          disabled={currentReviewsGroup === reviewGroups.length - 1}
          onClick={() =>
            setCurrentReviewsGroup((currentReviewsGroup) => {
              let n = currentReviewsGroup + 1;
              return n;
            })
          }
        >
          <Icons.chevronRight className="w-4 h-4" />
        </IconButton>
      </div>
    </div>
  );
}
