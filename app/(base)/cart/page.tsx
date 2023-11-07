import { Metadata } from "next";

import { Product } from "@/db/schema";

import { siteConfig } from "@/config/site";

import { getCurrentUserCartItems } from "@/lib/actions/cart";
import { getProduct } from "@/lib/actions/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItemProducts } from "@/components/cart-item-products";
import { CheckoutForm } from "@/components/forms/checkout-form";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Your Shopping Cart",
  description: `View and manage items in your shopping cart on ${siteConfig.name}. Add, remove, or purchase products for a seamless shopping experience.`,
};

export default async function CheckoutPage() {
  const cartItems = await getCurrentUserCartItems();
  const cartItemProducts: Product[] = [];

  await Promise.all(
    cartItems.map(async (item) => {
      const product = await getProduct(item.productId);
      if (product) {
        cartItemProducts.push(product);
      }
    })
  );

  const itemCount = cartItemProducts.length;

  return (
    <Shell>
      {itemCount > 0 ? (
        <>
          <div>
            <Heading size="lg">
              {itemCount} {itemCount > 1 ? "items" : "item"} in your cart
            </Heading>
          </div>
          <div className="flex gap-8 max-md:flex-col-reverse">
            <div className="grid flex-1 gap-4">
              <CartItemProducts cartProducts={cartItemProducts} />
            </div>
            <div className="w-full md:w-max lg:w-[400px]">
              <Card>
                <CardHeader>
                  <CardTitle>How you&apos;ll pay</CardTitle>
                </CardHeader>
                <CardContent>
                  <CheckoutForm products={cartItemProducts} />
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
