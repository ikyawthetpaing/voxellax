import { Product } from "@/db/schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CheckoutForm } from "../forms/checkout-form";

interface Props {
  trigger: JSX.Element;
  products: Product[];
}

export function CheckoutDialog({ trigger, products }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How&apos;ll you pay</DialogTitle>
        </DialogHeader>
        <CheckoutForm products={products} />
      </DialogContent>
    </Dialog>
  );
}
