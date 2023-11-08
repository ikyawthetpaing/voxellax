"use client";

import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Review, User } from "@/db/schema";

import { getUser } from "@/lib/actions/user";
import { formatDate, groupArray } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { RenderStars } from "@/components/listing/render-stars";

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
              {reviews.length > 0 ? (
                <>
                  <div className="grid gap-6">
                    {reviewGroups[currentReviewsGroup - 1].map((index) => (
                      <ReviewItem key={index} review={reviews[index]} />
                    ))}
                  </div>
                  <PaginationButton
                    currentPage={currentReviewsGroup}
                    setCurrentPage={setCurrentReviewsGroup}
                    pageCount={reviewGroups.length}
                    isPending={false}
                  />
                </>
              ) : (
                <div>no review</div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

interface ReviewItemProps {
  review: Review;
}
function ReviewItem({ review }: ReviewItemProps) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUser(review.userId).then((data) => setUser(data || null));
  }, [review.userId]);

  if (!user) return null;

  return (
    <div>
      <div className="flex gap-3">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarImage src={user.image || ""} alt={user.name || ""} />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <h1 className="text-sm font-semibold">{user.name}</h1>
            <div className="flex items-center gap-2 opacity-75">
              <Icons.calendar className="h-3 w-3" />
              <span className="text-xs">{formatDate(review.createdAt)}</span>
            </div>
          </div>
          <RenderStars size={4} averageRate={review.rate} />
          {review.message && <p className="text-sm">{review.message}</p>}
        </div>
      </div>
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
