"use client";

import { useEffect, useState } from "react";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { createQueryString } = useCreateQueryString();

  const [sortValue, setSortValue] = useState<string>();

  const sortParam = searchParams.get("sort");

  useEffect(() => {
    if (sortParam) {
      setSortValue(sortParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSortParam = (value: string) => {
    setSortValue(value);
    const queryString = createQueryString({
      sort: value ? value : null,
    });

    router.push(`${pathname}?${queryString}`, {
      scroll: false,
    });
  };

  return (
    <Select
      value={sortValue || undefined}
      onValueChange={(value) => updateSortParam(value)}
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
