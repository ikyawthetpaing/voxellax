"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { CartItemsContext } from "@/context/cart-items-context";
import { Product } from "@/db/schema";
import { ProductImageUploadedFile } from "@/types";

import { getProductAction } from "@/lib/actions/product";
import { formatPrice, getProductThumbnailImage } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export function CartSheet() {
  const cartItemsContext = useContext(CartItemsContext);
  const cartItems = useMemo(
    () => cartItemsContext?.data || [],
    [cartItemsContext?.data]
  );

  const [filteredCartProducts, setFilteredCartProducts] = useState<Product[]>(
    []
  );
  const [itemCount, setItemCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    if (cartItems) {
      const fetchCartProducts = async () => {
        const cartProducts = await Promise.all(
          cartItems.map(
            async ({ productId }) => await getProductAction(productId)
          )
        );

        // Filter out undefined values
        const resolvedCartProducts: Product[] = [];
        cartProducts.map((product) => {
          if (!!product) {
            resolvedCartProducts.push(product);
          }
        });

        setFilteredCartProducts(resolvedCartProducts);
        setItemCount(resolvedCartProducts.length);

        // Calculate total price based on resolvedCartProducts
        const totalPrice = resolvedCartProducts.reduce(
          (total, product) => total + product.price,
          0
        );
        setCartTotalPrice(totalPrice);
      };

      fetchCartProducts();
    }
  }, [cartItems]);

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

        <ScrollArea className="h-full px-6">
          <div className="flex flex-1 flex-col gap-4 overflow-hidden py-6">
            {filteredCartProducts.map(
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
                  {index !== cartItems.length - 1 && <Separator />}
                </div>
              )
            )}
            {filteredCartProducts.map(
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
                  {index !== cartItems.length - 1 && <Separator />}
                </div>
              )
            )}
            {filteredCartProducts.map(
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
                  {index !== cartItems.length - 1 && <Separator />}
                </div>
              )
            )}
          </div>
        </ScrollArea>
        <SheetFooter className="bottom-0 grid w-full grid-cols-1 gap-1.5 border-t p-6">
          <div className="flex">
            <span className="flex-1">Subtotal</span>
            <span>{formatPrice(cartTotalPrice, 2)}</span>
          </div>
          <div className="flex">
            <span className="flex-1">Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex">
            <span className="flex-1">Taxes</span>
            <span>Calculated at checkout</span>
          </div>
          <Separator className="mt-1.5" />
          <div className="flex">
            <span className="flex-1">Total</span>
            <span>{formatPrice(cartTotalPrice, 2)}</span>
          </div>
          <div className="mt-1.5">
            <Button
              aria-label="Proceed to checkout"
              size="sm"
              className="w-full"
            >
              Proceed to Checkout
            </Button>
          </div>
        </SheetFooter>
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
