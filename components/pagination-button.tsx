"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { useCreateQueryString } from "@/hooks/create-query-string";
import { Button } from "@/components/ui/button";

import { Icons } from "./icons";

interface PaginationButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  pageCount: number;
  page: string;
  per_page?: string;
  siblingCount?: number;
}

export function PaginationButton({
  pageCount,
  page,
  per_page,
  siblingCount = 1,
  className,
  ...props
}: PaginationButtonProps) {
  const { createQueryString } = useCreateQueryString();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sortValue, setSortValue] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const sortParam = searchParams.get("sort");

  useEffect(() => setSortValue(sortParam), [sortParam]);

  // Memoize pagination range to avoid unnecessary re-renders
  const paginationRange = useMemo(() => {
    const delta = siblingCount + 2;

    const range = [];
    for (
      let i = Math.max(2, Number(page) - delta);
      i <= Math.min(pageCount - 1, Number(page) + delta);
      i++
    ) {
      range.push(i);
    }

    if (Number(page) - delta > 2) {
      range.unshift("...");
    }
    if (Number(page) + delta < pageCount - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (pageCount !== 1) {
      range.push(pageCount);
    }

    return range;
  }, [pageCount, page, siblingCount]);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      <Button
        aria-label="Go to first page"
        variant="outline"
        size="icon"
        className="hidden h-8 w-8 lg:flex"
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathname}?${createQueryString({
                page: 1,
                per_page: per_page ?? null,
                sort: sortValue,
              })}`
            );
          });
        }}
        disabled={Number(page) === 1 || isPending}
      >
        <Icons.chevronsLeft className="h-4 w-4" aria-hidden="true" />
      </Button>
      <Button
        aria-label="Go to previous page"
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathname}?${createQueryString({
                page: Number(page) - 1,
                per_page: per_page ?? null,
                sort: sortValue,
              })}`
            );
          });
        }}
        disabled={Number(page) === 1 || isPending}
      >
        <Icons.chevronLeft className="h-4 w-4" aria-hidden="true" />
      </Button>
      {paginationRange.map((pageNumber, i) =>
        pageNumber === "..." ? (
          <Button
            aria-label="Page separator"
            key={i}
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled
          >
            ...
          </Button>
        ) : (
          <Button
            aria-label={`Page ${pageNumber}`}
            key={i}
            variant={Number(page) === pageNumber ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              startTransition(() => {
                router.push(
                  `${pathname}?${createQueryString({
                    page: pageNumber,
                    per_page: per_page ?? null,
                    sort: sortValue,
                  })}`
                );
              });
            }}
            disabled={isPending}
          >
            {pageNumber}
          </Button>
        )
      )}
      <Button
        aria-label="Go to next page"
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathname}?${createQueryString({
                page: Number(page) + 1,
                per_page: per_page ?? null,
                sort: sortValue,
              })}`
            );
          });
        }}
        disabled={Number(page) === (pageCount ?? 10) || isPending}
      >
        <Icons.chevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>
      <Button
        aria-label="Go to last page"
        variant="outline"
        size="icon"
        className="hidden h-8 w-8 lg:flex"
        onClick={() => {
          router.push(
            `${pathname}?${createQueryString({
              page: pageCount ?? 10,
              per_page: per_page ?? null,
              sort: sortValue,
            })}`
          );
        }}
        disabled={Number(page) === (pageCount ?? 10) || isPending}
      >
        <Icons.chevronsRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
