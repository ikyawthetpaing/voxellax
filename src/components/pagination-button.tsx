import { Dispatch, SetStateAction, useMemo } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface PaginationButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
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
  className,
  ...props
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

    // const range = [];
    // if (pageCount <= 3) {
    //   range.push(1, 2, 3);
    // } else if (currentPage === 1 || currentPage === 2) {
    //   range.push(1, 2);
    //   if (pageCount > 2) {
    //     range.push("...");
    //   }
    //   range.push(pageCount);
    // } else if (currentPage === pageCount || currentPage === pageCount - 1) {
    //   range.push(1, "...");
    //   if (currentPage === pageCount - 1 && currentPage !== 1) {
    //     range.push(currentPage - 1);
    //   }
    //   range.push(pageCount);
    // } else {
    //   range.push(1, "...");
    //   if (currentPage !== pageCount && currentPage !== pageCount - 1) {
    //     range.push(currentPage);
    //   }
    //   range.push("...", pageCount);
    // }

    // return range;
  }, [pageCount, currentPage, siblingCount]);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 px-0"
        onClick={() =>
          setCurrentPage(() => {
            let n = currentPage - 1;
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
            let n = currentPage + 1;
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
