"use client";

import { useState } from "react";
import { VariantProps, cva } from "class-variance-authority";

import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/config/category";

const categories = getCategories();

const searchFormVariants = cva("rounded-full border", {
  variants: {
    size: {
      default: "h-10 h-10",
      sm: "h-9 px-3",
      lg: "h-11 h-11 py-8 px-5 rounded-xl",
    },
  },
});

interface SearchFormProps
  extends React.FormHTMLAttributes<HTMLFormElement>,
    VariantProps<typeof searchFormVariants> {}

export function SearchForm({ className, size, ...props }: SearchFormProps) {
  const [query, setQuery] = useState<string>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(categories[0].value);

  return (
    <form
      className={cn(
        searchFormVariants({ size }),
        "flex items-center transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      <button type="submit">
        <Icons.search className="h-4 w-4" />
      </button>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="h-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="flex w-[100px] justify-end p-0 hover:bg-transparent"
          >
            {value
              ? categories.find((category) => category.value === value)?.label
              : "Select category..."}
            <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Icons.check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="line-clamp-1">{category.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </form>
  );
}
