"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn, formatPrice } from "@/lib/utils";
import { Cart, License } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { CartPatchSchema } from "@/types";
interface UpdateCartProps {
  cartItem: Cart;
  licenses: License[];
  purchaseLicense: License | null;
}

export function UpdateCart({
  cartItem,
  licenses,
  purchaseLicense,
}: UpdateCartProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [currentLicense, setCurrentLicense] = useState<License | undefined>(
    purchaseLicense ? purchaseLicense : licenses[0]
  );

  async function updateCartItem(licenseId: string) {
    setIsLoading(true);
    try {
      const data: CartPatchSchema = { purchaseLicenseId: licenseId };
      const res = await fetch(`/api/products/${cartItem.productId}/carts`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        if (res.status === 403) {
          router.push("/login");
        } else {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
            duration: 5000,
          });
        }
      }
    } catch (error) {
      console.error("Error updating the cart item:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        duration: 5000,
      });
    }
    setIsLoading(false);
    router.refresh();
  }

  async function deleteCartItem() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products/${cartItem.productId}/carts`, {
        method: "DELETE",
      });
      if (!res.ok) {
        if (res.status === 403) {
          router.push("/login");
        } else {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
            duration: 5000,
          });
        }
      }
    } catch (error) {
      console.error("Error deleteing the cart item:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        duration: 5000,
      });
    }
    setIsLoading(false);
    router.refresh();
  }

  return (
    <div className="flex items-center space-x-1">
      {licenses.length !== 0 && (
        <div className="flex items-center space-x-1">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="flex h-8 justify-end p-3 capitalize"
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {currentLicense?.type}
                <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandGroup>
                  {licenses.map((license, index) => (
                    <CommandItem
                      key={index}
                      disabled={isLoading}
                      onSelect={() => {
                        setCurrentLicense(license);
                        updateCartItem(license.id);
                        setOpen(false);
                      }}
                    >
                      <div className="flex w-full justify-between">
                        <div className="flex items-center gap-2">
                          <Icons.check
                            className={cn(
                              "h-4 w-4",
                              currentLicense?.type === license.type
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <span className="capitalize">{license.type}</span>
                        </div>
                        <div>{formatPrice(license.price)}</div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={deleteCartItem}
        disabled={isLoading}
      >
        <Icons.trash className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Delete item</span>
      </Button>
    </div>
  );
}
