import Image from "next/image";
// import { getCartAction } from "@/app/_actions/cart";

import { data } from "@/constants/data-dev";

import { formatPrice } from "@/lib/utils";
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

export async function CartSheet() {
  // const cartLineItems = await getCartAction();

  // const itemCount = cartLineItems.reduce(
  //   (total, item) => total + Number(item.quantity),
  //   0
  // );

  // const cartTotal = cartLineItems.reduce(
  //   (total, item) => total + Number(item.quantity) * Number(item.price),
  //   0
  // );

  // dev
  let cartTotalPrice = 0;
  const itemCount = data.carts.length;
  const cartItems = data.carts.map(({ productId }) => {
    const item = data.products.find(({ id }) => id === productId);
    // const license = data.licenses.find(
    //   ({ productId }) => productId === item?.id
    // );
    cartTotalPrice += item?.price ?? 0;
    return { item };
  });

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
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
        </SheetHeader>
        <Separator />
        {itemCount > 0 ? (
          <>
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-4 pr-6">
                  {cartItems.map(({ item }, index) => (
                    <div key={item?.id} className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded">
                          {/* {item?.images?.length ? (
                            <Image
                              src={
                                item.images[0]?.url ??
                                "/images/product-placeholder.webp"
                              }
                              alt={item.images[0]?.name ?? item.name}
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
                          )} */}
                          <div className="flex h-full items-center justify-center bg-secondary">
                            <Icons.image
                              className="h-4 w-4 text-muted-foreground"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-1 self-start text-sm">
                          <span className="line-clamp-1">{item?.name}</span>
                          <span className="line-clamp-1 text-muted-foreground">
                            {formatPrice(item?.price || 0, 2)}
                          </span>
                          <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                            {`${item?.category}`}
                          </span>
                        </div>
                        <UpdateCart />
                      </div>
                      {index !== cartItems.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="grid gap-1.5 text-sm">
              <Separator className="mb-2" />
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
              <Separator className="mt-2" />
              <div className="flex">
                <span className="flex-1">Total</span>
                <span>{formatPrice(cartTotalPrice, 2)}</span>
              </div>
              <SheetFooter className="mt-1.5">
                <Button
                  aria-label="Proceed to checkout"
                  size="sm"
                  className="w-full"
                >
                  Proceed to Checkout
                </Button>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <Icons.cart
              className="h-12 w-12 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-lg font-medium text-muted-foreground">
              Your cart is empty
            </span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
