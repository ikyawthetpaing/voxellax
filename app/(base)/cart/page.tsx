"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Product, Store } from "@/db/schema";

import { getProduct } from "@/lib/actions/product";
import { getStore } from "@/lib/actions/store";
import { formatPrice, getProductThumbnailImage } from "@/lib/utils";
import { useCartItems } from "@/context/cart-items-context";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UpdateCart } from "@/components/cart/update-cart";
import { CheckoutForm } from "@/components/forms/checkout-form";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import { Shell } from "@/components/shell";

export default function CheckoutPage() {
  const { data: cartItems } = useCartItems();

  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [itemCount, setItemCount] = useState(0);

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

        setCartProducts(_cartProducts);
        setItemCount(_cartProducts.length);
      };

      fetchCartProducts();
    }
  }, [cartItems]);

  return (
    <Shell>
      {itemCount > 0 ? (
        <>
          <div>
            <Heading size="lg">
              {itemCount} {itemCount > 1 ? "items" : "item"} in your cart
            </Heading>
          </div>
          <div className="flex gap-8 max-sm:flex-col-reverse">
            <div className="grid flex-1 gap-4">
              {cartProducts.map((product, index) => (
                <>
                  {index === 0 && <Separator />}
                  <CheckoutProductItem product={product} key={index} />
                  <Separator />
                </>
              ))}
            </div>
            <div className="w-full sm:w-[400px]">
              <Card>
                <CardHeader>
                  <CardTitle>How you&apos;ll pay</CardTitle>
                </CardHeader>
                <CardContent>
                  <CheckoutForm products={cartProducts} />
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-8 text-muted-foreground">
            <Icons.cart className="h-20 w-20" />
            <Heading>Your cart is empty</Heading>
          </div>
        </div>
      )}
    </Shell>
  );
}

function CheckoutProductItem({ product }: { product: Product }) {
  const [store, setStore] = useState<Store | null>(null);
  const thumbnail = product.images
    ? getProductThumbnailImage(product.images)
    : null;

  useEffect(() => {
    const fetchStore = async () => {
      const _store = await getStore(product.storeId);
      setStore(_store || null);
    };
    fetchStore();
  }, [product.storeId]);

  return (
    <div className="flex flex-1 flex-col gap-4 sm:flex-row">
      <div className="mx-auto w-40 overflow-hidden rounded-lg sm:mx-0">
        <AspectRatio ratio={4 / 3}>
          {thumbnail ? (
            <Image
              src={thumbnail.url}
              alt={thumbnail.name}
              fill
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <Icons.image className="h-16 w-16" />
            </div>
          )}
        </AspectRatio>
      </div>

      <div className="flex flex-1 flex-col max-sm:items-center">
        <span className="line-clamp-1 font-medium">{product.name}</span>
        <div className="text-xs">
          <span className="text-muted-foreground">by </span>
          <Link href={`/store/${store?.id}`}>{store?.name}</Link>
          <span className="text-muted-foreground"> in </span>
          <Link href={`/category/${product.category}`} className="capitalize">
            {product.category}
          </Link>
        </div>
        <div className="my-2">
          <h2 className="w-fit rounded-md font-semibold text-accent-foreground">
            {formatPrice(product.price, 2)}
          </h2>
        </div>
        <div className="flex gap-4">
          <Button size="sm" variant="secondary">
            Proceed to Checkout
          </Button>
          <Button size="sm" variant="outline">
            Save for later
          </Button>
          <UpdateCart productId={product.id} />
        </div>
      </div>
    </div>
  );
}
