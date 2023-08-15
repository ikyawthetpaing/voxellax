"use client";

import { HTMLAttributes } from "react";

// import { cn } from "@/lib/utils";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Icons } from "@/components/icons";
// import { RenderStars } from "@/components/listing/render-stars";

// import { PaginationButton } from "@/components/pagination-button";
// import { Reviews } from "@/types/dev";

// interface ProductReviewsProps extends HTMLAttributes<HTMLDivElement> {
// reviews: Reviews[];
// }

// export function Reviews({ reviews, className, ...props }: ProductReviewsProps) {
// const [currentReviewsGroup, setCurrentReviewsGroup] = useState(1);

// const totalReviewsPerGroup = 3;
// const reviewGroups = groupArray(
//   Array.from({ length: reviews.length }, (_, i) => i),
//   totalReviewsPerGroup
// );

// return (
// <div className={cn("grid gap-6", className)} {...props}>
// {
/* <div className="grid items-center gap-2">
        <h1>Reviews ({reviews.length})</h1>
        <hr />
      </div>
      <div className="grid gap-6">
        {reviewGroups[currentReviewsGroup - 1]?.map((index) => (
          <div key={index}>
            <div className="flex gap-3">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarImage
              src={"/notfound"}
              alt={reviews[index].message}
            />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <h1 className="font-semibold">Jon Doe</h1>
                  <div className="flex items-center gap-2 opacity-75">
                    <Icons.calendar className="h-3 w-3" />
                    <span className="text-xs">Apr 24, 2022</span>
                  </div>
                </div>
                <RenderStars size={5} averageRates={reviews[index].rate} />
                <p>{reviews[index]?.message}</p>
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
      /> */
// }
// </div>
// );
// }

export function Reviews() {
  return <div>Reviews</div>;
}
