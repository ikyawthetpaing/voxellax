import { HTMLAttributes } from "react";

import { Review } from "@/db/schema";

import { siteConfig } from "@/config/site";

import { getUser } from "@/lib/actions/user";
import { formatDate } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Empty } from "@/components/empty";
import { Icons } from "@/components/icons";
import { RenderStars } from "@/components/listing/render-stars";
import { PaginationButton } from "@/components/pagination-button";

interface ProductReviewsProps extends HTMLAttributes<HTMLDivElement> {
  reviews: Review[];
  totalReviews: number;
  pageCount: number;
  page: string;
  per_page?: string;
}

export function Reviews({
  reviews,
  totalReviews,
  pageCount,
  page,
  per_page,
  ...props
}: ProductReviewsProps) {
  return (
    <div {...props}>
      <Accordion
        type="single"
        defaultValue={reviews.length > 0 ? "reviews" : undefined}
        collapsible
        className="w-full"
      >
        <AccordionItem value="reviews">
          <AccordionTrigger>Reviews ({totalReviews})</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-6">
              <Separator orientation="horizontal" />
              {reviews.length > 0 ? (
                <>
                  <div className="grid gap-6">
                    {reviews.map((review, index) => (
                      <ReviewItem key={index} review={review} />
                    ))}
                  </div>
                  <PaginationButton
                    pageCount={pageCount}
                    page={page}
                    per_page={per_page}
                  />
                </>
              ) : (
                <div>
                  <Empty icon="messagesSquare" message="No review yet" />
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

async function ReviewItem({ review }: { review: Review }) {
  const user = await getUser(review.userId);
  return (
    <div>
      <div className="flex gap-3">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
          <AvatarFallback>
            {user?.name?.charAt(0) || siteConfig.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <h1 className="text-sm font-semibold">
              {user?.name || `${siteConfig.name} User`}
            </h1>
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
