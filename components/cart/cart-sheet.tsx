"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductImageUploadedFile } from "@/types";

import { Product } from "@/db/schema";

import { getCalculatedFees } from "@/config/checkout";

import { getProduct } from "@/lib/actions/product";
import { cn, formatPrice, getProductThumbnailImage } from "@/lib/utils";
import { useCartItems } from "@/context/cart-items-context";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UpdateCart } from "@/components/cart/update-cart";
import { Icons } from "@/components/icons";

import { CheckoutDetails } from "../checkout-details";
import { CheckoutDialog } from "../dialogs/checkout-dialog";

export function CartSheet() {
  const { data: cartItems } = useCartItems();

  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    if (cartItems) {
      const fetchCartProducts = async () => {
        const _cartProducts: Product[] = [];

        await Promise.all(
          cartItems.map(async ({ productId }) => {
            const product = await getProduct(productId);
            if (product) {
              _cartProducts.push(product);
            }
          })
        );

        const totalPrice = _cartProducts.reduce(
          (total, product) => total + product.price,
          0
        );
        setSubTotal(totalPrice);
        setCartProducts(_cartProducts);
        setItemCount(_cartProducts.length);
      };

      fetchCartProducts();
    }
  }, [cartItems]);

  const fees = getCalculatedFees({ itemCount, subTotal });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open cart"
          variant="outline"
          size="icon"
          className="relative rounded-full"
        >
          {itemCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-2 text-xs"
            >
              {itemCount}
            </Badge>
          )}
          <Icons.cart className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-lg">
        <SheetHeader className="border-b p-6">
          <SheetTitle>Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <ScrollArea className="h-full px-6">
            <div className="flex flex-1 flex-col gap-4 overflow-hidden py-6">
              {cartProducts.map(
                ({ id, name, category, images, price }, index) => (
                  <div key={id} className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <CartItemThumbnail images={images} />
                      <div className="flex flex-1 flex-col gap-1 self-start text-sm">
                        <span className="line-clamp-1">{name}</span>
                        <span className="line-clamp-1 text-muted-foreground">
                          {formatPrice(price, 2)}
                        </span>
                        <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                          {`${category}`}
                        </span>
                      </div>
                      <UpdateCart productId={id} />
                    </div>
                    <Separator />
                  </div>
                )
              )}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <Icons.cart
              className="mb-4 h-16 w-16 text-muted-foreground"
              aria-hidden="true"
            />
            <div className="text-xl font-medium text-muted-foreground">
              Your cart is empty
            </div>
            <SheetTrigger asChild>
              <Link
                aria-label="Add items to your cart to checkout"
                href="/search"
                className={cn(
                  buttonVariants({
                    variant: "link",
                    size: "sm",
                    className: "text-sm text-muted-foreground",
                  })
                )}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
        <div className="bottom-0 grid w-full gap-1.5 border-t p-6">
          <CheckoutDetails itemCount={itemCount} subTotal={subTotal} />
          <div className="mt-1.5">
            <CheckoutDialog
              products={cartProducts}
              trigger={
                <Button size="sm" className="w-full">
                  Proceed to Checkout
                </Button>
              }
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface CartItemThumbnailProps {
  images: ProductImageUploadedFile[] | null;
}

function CartItemThumbnail({ images }: CartItemThumbnailProps) {
  const thumbnail = images ? getProductThumbnailImage(images) : null;
  return (
    <div className="relative h-16 w-16 overflow-hidden rounded">
      {thumbnail ? (
        <Image
          src={thumbnail.url}
          alt={thumbnail.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="absolute object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-secondary">
          <Icons.image
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
