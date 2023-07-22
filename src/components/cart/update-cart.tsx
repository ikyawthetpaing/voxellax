"use client";

// import type { CartLineItem } from "@/types";
// import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";

// import { addToCartAction, deleteCartItemAction } from "@/app/_actions/cart";

import { Input } from "../ui/input";
import { useState } from "react";

interface UpdateCartProps {
  productId: string,
  licenseType: string
}

// for dev
import data from "@/helpers/data.json"
import { cn, formatPrice } from "@/lib/utils";

export function UpdateCart({productId, licenseType}: UpdateCartProps) {
  // const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const product = data.products.find(({id}) => id === productId);
  const [_licenseType, setLicenseType] = useState(licenseType);

  if (!product) {
    return null;
  }

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center space-x-1">
        <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="flex h-8 justify-end p-3 capitalize"
                >
                  {licenseType}
                  <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandGroup>
                    {product.licenses.map((license, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => {
                          setLicenseType(license.type);
                          setOpen(false);
                        }}
                      >
                        <div className="flex w-full justify-between">
                          <div className="flex items-center gap-2">
                            <Icons.check
                              className={cn(
                                "h-4 w-4",
                                licenseType === license.type
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <span className="capitalize">{license.type}</span>
                          </div>
                          <div>
                          {formatPrice(license.price)}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => {
          // startTransition(async () => {
          //   try {
          //     await deleteCartItemAction({
          //       productId: cartLineItem.id,
          //     });
          //   } catch (error) {
          //     error instanceof Error
          //       ? toast.error(error.message)
          //       : toast.error("Something went wrong.");
          //   }
          // });
        }}
        // disabled={isPending}
      >
        <Icons.trash className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Delete item</span>
      </Button>
    </div>
  );
}
