"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { productSortOptions } from "@/config/product";
import { useCreateQueryString } from "@/hooks/create-query-string";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductSortForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { createQueryString } = useCreateQueryString();

  const [sortValue, setSortValue] = useState<string>();

  const sortParam = searchParams.get("sort");

  useEffect(() => {
    if (
      sortParam &&
      productSortOptions.find((option) => option.value === sortParam)
    ) {
      setSortValue(sortParam);
    }
  }, [sortParam]);

  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          sort: sortValue || null,
        })}`,
        {
          scroll: false,
        }
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortValue]);

  return (
    <Select
      value={sortValue || undefined}
      onValueChange={(value) => setSortValue(value)}
      disabled={isPending}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {productSortOptions.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
