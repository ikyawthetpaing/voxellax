"use client";

import { useState } from "react";
import { FilterItem } from "@/types";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductFilterForm } from "@/components/forms/product-filter-form";

interface Props {
  filterItems: FilterItem[];
}

export function ProductFilterFormSheet({ filterItems }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex w-full flex-col gap-0 p-0 sm:max-w-lg"
        side="left"
      >
        <SheetHeader className="border-b p-6">
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-full px-6">
          <div className="flex flex-1 flex-col gap-4 overflow-hidden py-6">
            <ProductFilterForm filterItems={filterItems} />
          </div>
        </ScrollArea>
        <SheetFooter className="bottom-0 grid w-full grid-cols-2 gap-4 border-t p-6">
          <Button variant="outline">Clear</Button>
          <Button onClick={() => setOpen(false)}>Apply</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
