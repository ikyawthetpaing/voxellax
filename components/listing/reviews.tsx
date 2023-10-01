"use client";

import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useMemo,
  useState,
} from "react";

import { formatDate, groupArray } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Review } from "@/components/listing";
import { RenderStars } from "@/components/listing/render-stars";

import { Separator } from "../ui/separator";

interface ProductReviewsProps extends HTMLAttributes<HTMLDivElement> {
  reviews: Review[];
}

export function Reviews({ reviews, ...props }: ProductReviewsProps) {
  const [currentReviewsGroup, setCurrentReviewsGroup] = useState(1);

  const totalReviewsPerGroup = 3;
  const reviewGroups = groupArray(
    Array.from({ length: reviews.length }, (_, i) => i),
    totalReviewsPerGroup
  );

  return (
    <div {...props}>
      <Accordion
        type="single"
        defaultValue="reviews"
        collapsible
        className="w-full"
      >
        <AccordionItem value="reviews">
          <AccordionTrigger>Reviews ({reviews.length})</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-6">
              <Separator orientation="horizontal" />
              <div className="grid gap-6">
                {reviewGroups[currentReviewsGroup - 1].map((index) => (
                  <div key={index}>
                    <div className="flex gap-3">
                      <Avatar className="h-9 w-9 shrink-0">
                        {/* <AvatarImage
              src={user.image?.toString()}
              alt={user.name?.toString()}
            /> */}
                        <AvatarFallback>
                          {reviews[index].name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-2">
                        <div className="grid gap-1">
                          <h1 className="text-sm font-semibold">
                            {reviews[index].name}
                          </h1>
                          <div className="flex items-center gap-2 opacity-75">
                            <Icons.calendar className="h-3 w-3" />
                            <span className="text-xs">
                              {formatDate(reviews[index].createdAt)}
                            </span>
                          </div>
                        </div>
                        <RenderStars
                          size={4}
                          averageRate={reviews[index].rate}
                        />
                        <p className="text-sm">{reviews[index].message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <PaginationButton
                currentPage={currentReviewsGroup}
                setCurrentPage={setCurrentReviewsGroup}
                pageCount={reviewGroups.length}
                isPending={false}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

interface PaginationButtonProps {
  pageCount: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  isPending: boolean;
  siblingCount?: number;
}

export function PaginationButton({
  pageCount,
  currentPage,
  setCurrentPage,
  isPending,
  siblingCount = 1,
}: PaginationButtonProps) {
  const paginationRange = useMemo(() => {
    const delta = siblingCount;

    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(pageCount - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < pageCount - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (pageCount !== 1) {
      range.push(pageCount);
    }

    return range;
  }, [pageCount, currentPage, siblingCount]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 px-0"
        onClick={() =>
          setCurrentPage(() => {
            const n = currentPage - 1;
            return n;
          })
        }
        disabled={currentPage === 1 || isPending}
      >
        <Icons.chevronLeft className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Previous page</span>
      </Button>
      {paginationRange.map((pageNumber, i) =>
        pageNumber === "..." ? (
          <Button
            aria-label="Page separator"
            key={i}
            variant="outline"
            size="sm"
            className="h-8 w-8 px-0"
            disabled
          >
            ...
          </Button>
        ) : (
          <Button
            aria-label={`Page ${pageNumber}`}
            key={i}
            variant={currentPage === pageNumber ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 px-0"
            onClick={() => setCurrentPage(Number(pageNumber))}
            disabled={isPending}
          >
            {pageNumber}
          </Button>
        )
      )}
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 px-0"
        onClick={() =>
          setCurrentPage(() => {
            const n = currentPage + 1;
            return n;
          })
        }
        disabled={currentPage === (pageCount ?? 10) || isPending}
      >
        <Icons.chevronRight className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  );
}
