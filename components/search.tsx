"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getCategories } from "@/config/category";
import { useCreateQueryString } from "@/hooks/create-query-string";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";

interface SearchProps {
  size: "sm" | "lg";
  hideCategorySeletor?: boolean;
}

export function Search({
  size = "sm",
  hideCategorySeletor = false,
}: SearchProps) {
  const categories = getCategories();
  const allCategories = categories.map((category) => category.value).join(".");

  const [query, setQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>(allCategories);
  const { createQueryString } = useCreateQueryString();
  const router = useRouter();
  const searchParams = useSearchParams();

  const _query = searchParams.get("query");
  useEffect(() => {
    if (_query) {
      setQuery(_query);
    }
  }, [_query]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let categoriesParam = selectedCategory ? selectedCategory : null;

    // if hideCategorySeletor ignore selectedCategory
    if (hideCategorySeletor) {
      categoriesParam = searchParams.get("categories") ?? null;
    }

    router.push(
      `/search/?${createQueryString({
        query: query ? query : null,
        categories: categoriesParam,
      })}`,
      {
        scroll: false,
      }
    );
  }

  if (size === "lg") {
    return (
      <form
        onSubmit={onSubmit}
        className="flex h-16 w-full items-center gap-4 rounded-lg border px-4"
      >
        <button type="submit">
          <Icons.search className="h-4 w-4" />
        </button>
        <input
          type="text"
          placeholder="Search products"
          className="w-0 flex-1 bg-transparent focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {!hideCategorySeletor && (
          <>
            <Separator orientation="vertical" />
            <div>
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
              >
                <SelectTrigger className="border-0 p-0 focus:ring-0">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={allCategories}>All</SelectItem>
                    {categories.map(({ label, value }) => (
                      <SelectItem value={value} key={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </form>
    );
  }
  return (
    <form
      onSubmit={onSubmit}
      className="flex h-9 w-full items-center gap-3 rounded-full border px-3"
    >
      <button type="submit">
        <Icons.search className="h-4 w-4" />
      </button>
      <input
        type="text"
        placeholder="Search products"
        className="w-0 flex-1 bg-transparent focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Separator orientation="vertical" />
      <div>
        <Select
          defaultValue={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}
        >
          <SelectTrigger className="border-0 p-0 focus:ring-0">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={allCategories}>All</SelectItem>
              {categories.map(({ label, value }) => (
                <SelectItem value={value} key={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
