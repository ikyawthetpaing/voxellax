import { Product } from "@/db/schema";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CheckoutForm } from "@/components/forms/checkout-form";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";

interface Props {
  trigger: JSX.Element;
  products: Product[];
}

export function CheckoutDialog({ trigger, products }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {products.length > 0 ? (
          <>
            <Heading>How&apos;ll you pay</Heading>
            <CheckoutForm products={products} />
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <Icons.cart
              className="mb-4 h-16 w-16 text-muted-foreground"
              aria-hidden="true"
            />
            <div className="text-xl font-medium text-muted-foreground">
              Your cart is empty
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
