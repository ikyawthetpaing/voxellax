"use client";

import { HTMLAttributes, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { getCategories } from "@/config/category";
import { useCreateQueryString } from "@/hooks/create-query-string";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function ProductFilterForm({ ...props }: Props) {
  const categories = getCategories();
  const priceRanges = [
    { min: 2, max: 19 },
    { min: 20, max: 39 },
    { min: 40, max: 59 },
    { min: 60, max: 79 },
    { gte: 80 },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Search params
  const page = searchParams?.get("page") ?? "1";
  const per_page = searchParams?.get("per_page") ?? "8";
  const sort = searchParams?.get("sort") ?? "createdAt.desc";
  const categories_param = searchParams?.get("categories") ?? "all";
  const price_range_param = searchParams?.get("price_range") ?? null;

  // Create query string
  const { createQueryString } = useCreateQueryString();

  // Category filter
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRangeIndexes, setSelectedPriceRangeIndexes] = useState<
    number[]
  >([]);
  const [updateCategoriesParam, setUpdateCategoriesParam] = useState(false);
  const [updatePriceRangeParam, setUpdatePriceRangesParam] = useState(false);

  function arraysAreEqual(
    arr1: string[] | number[],
    arr2: string[] | number[]
  ): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    let newSelectedCategories = categories_param.split(".") || [];
    if (newSelectedCategories.includes("all")) {
      newSelectedCategories = categories.map((category) => category.value);
    }

    // Only update selectedCategories if it has changed
    if (!arraysAreEqual(selectedCategories, newSelectedCategories)) {
      setSelectedCategories(newSelectedCategories);
      setUpdateCategoriesParam(true);
    }
  }, [categories_param, categories, selectedCategories]);

  useEffect(() => {
    if (updateCategoriesParam) {
      startTransition(() => {
        router.push(
          `${pathname}?${createQueryString({
            categories: selectedCategories?.length
              ? selectedCategories.map((c) => c).join(".")
              : null,
          })}`,
          {
            scroll: false,
          }
        );
      });
      setUpdateCategoriesParam(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCategoriesParam]);

  useEffect(() => {
    if (price_range_param) {
      const newSelectedPriceRangeIndexes = price_range_param
        .split(".")
        .map(Number)
        .filter(
          (value) =>
            !isNaN(value) &&
            isFinite(value) &&
            value >= 0 &&
            value <= priceRanges.length - 1
        );

      // Only update selectedCategories if it has changed
      if (
        !arraysAreEqual(selectedPriceRangeIndexes, newSelectedPriceRangeIndexes)
      ) {
        setSelectedPriceRangeIndexes(newSelectedPriceRangeIndexes);
        setUpdatePriceRangesParam(true);
      }
    }
  }, [priceRanges.length, price_range_param, selectedPriceRangeIndexes]);

  useEffect(
    () => {
      if (updatePriceRangeParam) {
        startTransition(() => {
          router.push(
            `${pathname}?${createQueryString({
              price_range: selectedPriceRangeIndexes.length
                ? selectedPriceRangeIndexes.join(".")
                : null,
            })}`,
            {
              scroll: false,
            }
          );
        });
        setUpdatePriceRangesParam(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updatePriceRangeParam]
  );

  return (
    <div {...props}>
      <Accordion
        type="multiple"
        defaultValue={["categories", "price_range"]}
        className="grid w-full gap-2"
      >
        <AccordionItem value="categories" className="border-0">
          <AccordionTrigger className="rounded-lg bg-accent/75 px-4 py-2 hover:bg-accent hover:no-underline">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-6 px-4 py-6">
              {categories.map((category, index) => {
                const id = `category_${index}`;
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={id}
                      checked={selectedCategories.includes(category.value)}
                      onCheckedChange={(value) => {
                        if (value) {
                          setSelectedCategories([
                            ...selectedCategories,
                            category.value,
                          ]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter(
                              (_categoryValue) =>
                                _categoryValue !== category.value
                            )
                          );
                        }
                        setUpdateCategoriesParam(true);
                      }}
                    />
                    <Label
                      htmlFor={id}
                      className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.label}
                    </Label>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price_range" className="border-0">
          <AccordionTrigger className="rounded-lg bg-accent/75 px-4 py-2 hover:bg-accent hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-6 px-4 py-6">
              {priceRanges.map((priceRange, index) => {
                const id = priceRange.gte
                  ? `price_range_${index}`
                  : `price_range_${index}`;
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={id}
                      checked={selectedPriceRangeIndexes.includes(index)}
                      onCheckedChange={(value) => {
                        if (value) {
                          setSelectedPriceRangeIndexes([
                            ...selectedPriceRangeIndexes,
                            index,
                          ]);
                        } else {
                          setSelectedPriceRangeIndexes(
                            selectedPriceRangeIndexes.filter(
                              (priceRangeIndex) => priceRangeIndex !== index
                            )
                          );
                        }
                        setUpdatePriceRangesParam(true);
                      }}
                    />
                    <Label
                      htmlFor={id}
                      className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {priceRange.gte
                        ? `$${priceRange.gte}+`
                        : `$${priceRange.min} - $${priceRange.max}`}
                    </Label>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
