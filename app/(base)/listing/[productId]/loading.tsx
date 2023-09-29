"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductsListSkeleton } from "@/components/product/products-list";
import { Shell } from "@/components/shell";

export default function ListingLoadingPage() {
  return (
    <Shell>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-3/4 sm:w-1/2" />
          <Skeleton className="h-5 w-28 sm:w-48" />
        </div>
        <div className="grid gap-8 lg:flex">
          <div className="flex flex-1 flex-col gap-8">
            <ImageGallerySkeleton />
            <div className="hidden lg:grid">
              <ReviewsSkeleton />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <DetailCardSkeleton />
            <DescriptionSkeleton />
            <div className="lg:hidden">
              <ReviewsSkeleton />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-xl font-medium capitalize">You may also like</h1>
          <ProductsListSkeleton />
        </div>
      </div>
    </Shell>
  );
}

function ImageGallerySkeleton() {
  return (
    <div className="grid gap-3">
      <AspectRatio
        ratio={4 / 3}
        className="group relative overflow-hidden rounded-lg border"
      >
        <Skeleton className="h-full w-full" />
      </AspectRatio>
      <div className="hide-scrollbar flex w-full gap-3 overflow-x-scroll">
        {Array.from({ length: 10 }, (_, i) => i).map((index) => (
          <div
            key={index}
            className="flex w-20 shrink-0 overflow-hidden rounded-lg border border-background md:w-24"
          >
            <AspectRatio ratio={4 / 3}>
              <Skeleton className="h-full w-full" />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="grid gap-6">
      <div className="grid items-center gap-2">
        <Skeleton className="h-5 w-20" />
        <hr />
      </div>
      <div className="grid gap-6">
        {Array.from({ length: 3 }, (_, i) => i).map((index) => (
          <div key={index}>
            <div className="flex gap-3">
              <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
              <div className="grid w-full gap-2">
                <div className="grid gap-1">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <div>
                  <Skeleton className="h-5 w-32" />
                </div>

                <div className="flex w-full flex-col gap-1">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* PaginationButton Skeleton */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: 5 }, (_, i) => i).map((index) => (
          <Skeleton className="h-8 w-8" key={index} />
        ))}
      </div>
    </div>
  );
}

function DetailCardSkeleton() {
  return (
    <Card className="w-full lg:w-96">
      <CardHeader>
        <CardTitle className="flex gap-6">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-1/3" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-5 w-1/4" />
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="space-y-1">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-1/2" />
        </div>

        <div className="grid gap-2">
          {/* License type */}
          <div className="flex gap-6">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-1/3" />
          </div>

          {Array.from({ length: 3 }, (_, i) => i).map((index) => (
            <Skeleton className="h-5 w-full" key={index} />
          ))}
        </div>

        <div className="flex gap-6">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-1/3" />
        </div>

        <div className="flex gap-6">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-1/3" />
        </div>
      </CardContent>
      <CardFooter className="grid gap-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

function DescriptionSkeleton() {
  return (
    <div className="lg:w-96">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <Skeleton className="h-5 w-1/2" />
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <Skeleton className="h-5 w-1/2" />
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <Skeleton className="h-5 w-1/2" />
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
