"use client";

import { HTMLAttributes, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterItem, QueryParam } from "@/types";

import { getUniqueString } from "@/lib/utils";
import { useCreateQueryString } from "@/hooks/create-query-string";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props extends HTMLAttributes<HTMLDivElement> {
  filterItems: FilterItem[];
}

export function ProductFilterForm({ filterItems, ...props }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { createQueryString } = useCreateQueryString();

  const [params, setParams] = useState<QueryParam[]>([]);

  // only initalize when component mount
  useEffect(() => {
    const newParams: QueryParam[] = filterItems.map((item) => {
      return {
        key: item.key,
        value: searchParams.get(item.key),
      };
    });
    setParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => console.log(params), [params]);

  const updateParams = ({
    key,
    value,
    checkedState,
    paramValues,
    type,
  }: {
    key: FilterItem["key"];
    type: FilterItem["type"];
    value: string;
    checkedState: boolean;
    paramValues: string[];
  }) => {
    if (checkedState) {
      if (type === "multiple") {
        paramValues.push(value);
      } else {
        paramValues = [value];
      }
    } else {
      const optionIndex = paramValues.indexOf(value);
      if (optionIndex !== -1) {
        paramValues.splice(optionIndex, 1);
      }
    }

    const newValue = paramValues.join(".");

    // update on state
    const newParams = params.filter((_param) => _param.key !== key);
    newParams.push({ key, value: newValue });
    setParams(newParams);

    // update on url
    const queryStringParams = {
      [key]: newValue ? newValue : null,
    };
    const queryString = createQueryString(queryStringParams);

    router.push(`${pathname}?${queryString}`, {
      scroll: false,
    });
  };

  return (
    <div {...props}>
      <Accordion
        type="multiple"
        defaultValue={filterItems.map((item) => item.key)}
        className="grid w-full gap-2"
      >
        {filterItems.map((item, index) => (
          <AccordionItem key={index} value={item.key} className="border-0">
            <AccordionTrigger className="rounded-lg bg-accent/75 px-4 py-2 hover:bg-accent hover:no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-6 px-4 py-6">
                {item.options.map((option) => {
                  const id = getUniqueString();
                  const paramValues =
                    params
                      .find((param) => param.key === item.key)
                      ?.value?.split(".") || [];
                  const isChecked = paramValues.includes(option.value);

                  return (
                    <div key={id} className="flex items-center space-x-2">
                      <Checkbox
                        id={id}
                        checked={isChecked}
                        onCheckedChange={(value) =>
                          updateParams({
                            key: item.key,
                            type: item.type,
                            value: option.value,
                            checkedState: !!value,
                            paramValues,
                          })
                        }
                      />
                      <Label
                        htmlFor={id}
                        className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
