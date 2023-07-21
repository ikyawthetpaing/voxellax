"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
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
import { Shell } from "@/components/shell";
// import { ProductsSkeleton } from "@/components/products";

export default function ListingLoadingPage() {
  return (
    <Shell>
      <div className="flex flex-col gap-8">
        <div className="grid lg:flex gap-8">
          <div className="flex-1 flex flex-col gap-8">
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
          {/* <ProductsSkeleton /> */}
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
        className="rounded-lg overflow-hidden relative group border"
      >
        <Skeleton className="w-full h-full" />
      </AspectRatio>
      <div className="flex gap-3 w-full overflow-x-scroll">
        {Array.from({ length: 10 }, (_, i) => i).map((index) => (
          <div
            key={index}
            className="flex w-20 md:w-24 overflow-hidden rounded-lg border border-background flex-shrink-0"
          >
            <AspectRatio ratio={4 / 3}>
              <Skeleton className="w-full h-full" />
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
      <div className="grid gap-2 items-center">
        <Skeleton className="w-20 h-5" />
        <hr />
      </div>
      <div className="grid gap-6">
        {Array.from({ length: 3 }, (_, i) => i).map((index) => (
          <div key={index}>
            <div className="flex gap-3">
              <Skeleton className="w-9 h-9 flex-shrink-0 rounded-full" />
              <div className="w-full grid gap-2">
                <div className="grid gap-1">
                  <Skeleton className="w-32 h-5" />
                  <Skeleton className="w-20 h-5" />
                </div>
                <div>
                  <Skeleton className="w-32 h-5" />
                </div>

                <div className="w-full flex flex-col gap-1">
                  <Skeleton className="w-full h-5" />
                  <Skeleton className="w-1/2 h-5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* PaginationButton Skeleton */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: 5 }, (_, i) => i).map((index) => (
          <Skeleton className="w-8 h-8" key={index}/>
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
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-1/3 h-5" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-1/4 h-5" />
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="space-y-1">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-1/2 h-5" />
        </div>

        <div className="grid gap-2">
          {/* License type */}
          <div className="flex gap-6">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-1/3 h-5" />
          </div>

          {Array.from({ length: 3 }, (_, i) => i).map((index) => (
            <Skeleton className="w-full h-5" key={index}/>
          ))}
        </div>

        <div className="flex gap-6">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-1/3 h-5" />
        </div>

        <div className="flex gap-6">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-1/3 h-5" />
        </div>
      </CardContent>
      <CardFooter className="grid gap-3">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
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
            <Skeleton className="w-1/2 h-5" />
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-1/2 h-5" />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <Skeleton className="w-1/2 h-5" />
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-1/2 h-5" />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <Skeleton className="w-1/2 h-5" />
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-1/2 h-5" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
