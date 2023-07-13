import Image from "next/image";

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
// import { UpdateCart } from "@/components/cart/update-cart";

// for dev
import data from "@/helpers/data.json"

import { Icons } from "@/components/icons";
import { UpdateCart } from "./update-cart";
// import { getCartAction } from "@/app/_actions/cart";

export async function CartSheet() {
  // const cartLineItems = await getCartAction();

  // const itemCount = cartLineItems.reduce(
  //   (total, item) => total + Number(item.quantity),
  //   0
  // );

  // let totalPrice = data.products.find()

  // const cartTotal = cartLineItems.reduce(
  //   (total, item) => total + Number(item.price),
  //   0
  // );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Cart"
          variant="outline"
          size="icon"
          className="relative rounded-full"
        >
          {data.cartItems.length > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-2 text-[9px] flex justify-center items-center"
            >
              {data.cartItems.length}
            </Badge>
          )}
          <Icons.shoppingCart className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Cart {data.cartItems.length > 0 && `(${data.cartItems.length})`}</SheetTitle>
        </SheetHeader>
        <Separator />
        {data.cartItems.length > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-5 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-5 pr-6">
                  {data.cartItems.map((item) => {
                    let product = data.products.find(({id}) => id === item.productId);
                    if (!product) {
                      return null;
                    }
                    let license = product.licenses.find(({type}) => type === item.licenseType);
                    return (
                      <div key={item.productId} className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="absolute object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-1 self-start text-sm">
                          <span className="line-clamp-1">{product.name}</span>
                          <span className="line-clamp-1 text-muted-foreground">
                            {license && formatPrice(license.price)}
                          </span>
                          <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                            {`${product.categories.join(" / ")}`}
                          </span>
                        </div>
                        <UpdateCart productId={item.productId} licenseType={item.licenseType}/>
                      </div>
                      <Separator />
                    </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>
            <div className="grid gap-1.5 pr-6 text-sm">
              <Separator className="mb-2" />
              <div className="flex">
                <span className="flex-1">Subtotal</span>
                <span>{formatPrice(1000)}</span>
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
                <span>{formatPrice(1500)}</span>
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
            <Icons.shoppingCart
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
