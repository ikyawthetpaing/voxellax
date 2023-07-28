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
import { Icons } from "@/components/icons";
import { UpdateCart } from "./update-cart";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { Cart } from "@prisma/client";

export async function CartSheet() {
  const user = await getCurrentUser();

  let cartItems: Cart[] = [];

  if (user) {
    cartItems = await db.cart.findMany({ where: { userId: user?.id } });
  }

  const data = await Promise.all(
    cartItems.map(async (cartItem) => {
      const product = await db.product.findFirst({
        where: { id: cartItem.productId ?? "" },
        select: { name: true, category: true, storeId: true },
      });
      if (!product) {
        return null;
      }

      const store = await db.store.findFirst({
        where: {
          id: product.storeId || undefined,
        },
        select: { id: true, name: true },
      });
      if (!store) {
        return null;
      }

      const coverImage = await db.file.findFirst({
        where: { productImagesId: cartItem.productId, isThumbnail: true },
        select: { url: true },
      });
      const purchaseLicense = await db.license.findFirst({
        where: { id: cartItem.purchaseLicenseId ?? "" },
      });
      const licenses = await db.license.findMany({
        where: { productId: cartItem.productId },
      });

      const price = purchaseLicense?.price || licenses[0]?.price || 0;

      return {
        cartItem,
        product,
        store,
        price,
        coverImage,
        licenses,
        purchaseLicense,
      };
    })
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Cart"
          variant="outline"
          size="icon"
          className="relative rounded-full"
        >
          {cartItems.length > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-2 text-[9px]"
            >
              {cartItems.length}
            </Badge>
          )}
          <Icons.shoppingCart className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>
            Cart {cartItems.length > 0 && `(${cartItems.length})`}
          </SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-5 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-5 pr-6">
                  {data.map((data) => {
                    if (!data) {
                      return null;
                    }

                    const {
                      cartItem,
                      product,
                      store,
                      price,
                      coverImage,
                      licenses,
                      purchaseLicense,
                    } = data;

                    return (
                      <div key={cartItem.id} className="space-y-3">
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="relative w-24 overflow-hidden rounded">
                            <AspectRatio ratio={4 / 3}>
                              <Image
                                src={
                                  coverImage?.url ||
                                  siteConfig.placeholderImageUrl
                                }
                                alt={product.name}
                                fill
                                className="absolute object-cover"
                                loading="lazy"
                              />
                            </AspectRatio>
                          </div>
                          <div className="flex flex-1 flex-col gap-1 self-start text-sm">
                            <span className="line-clamp-1">{product.name}</span>
                            <span className="line-clamp-1 text-muted-foreground">
                              {formatPrice(price)}
                            </span>
                            <div className="line-clamp-1 text-xs">
                              <span className="text-muted-foreground">by </span>
                              <Link href={`/store/${store.id}`}>
                                {store.name}
                              </Link>
                              <span className="text-muted-foreground">
                                {" "}
                                in{" "}
                              </span>
                              <Link
                                href={`/category/${product.category}`}
                                className="capitalize"
                              >
                                {product.category}
                              </Link>
                            </div>
                          </div>
                          <UpdateCart
                            cartItem={cartItem}
                            licenses={licenses}
                            purchaseLicense={purchaseLicense}
                          />
                        </div>
                        <Separator />
                      </div>
                    );
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
