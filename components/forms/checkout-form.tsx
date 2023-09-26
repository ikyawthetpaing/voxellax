"use client";

import { Product } from "@/db/schema";

import { checkoutOptions, defaultCheckoutType } from "@/config/checkout";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckoutDetails } from "@/components/checkout-details";
import { Icons } from "@/components/icons";

type Fee = {
  label: string;
  priceLabel: string;
};

interface Props {
  products: Product[];
}

export function CheckoutForm({ products }: Props) {
  const subTotal = products.reduce(
    (total, product) => total + product.price,
    0
  );
  const itemCount = products.length;

  return (
    <div className="grid gap-6">
      <RadioGroup defaultValue={defaultCheckoutType}>
        {checkoutOptions.map((checkoutOption, index) => (
          <div className="flex items-center space-x-3" key={index}>
            <RadioGroupItem
              value={checkoutOption.type}
              id={checkoutOption.type}
              className="scale-150"
            />
            <Label
              className="flex cursor-pointer gap-2"
              htmlFor={checkoutOption.type}
            >
              {checkoutOption.icons.map((icon, index) => {
                const Icon = Icons[icon];
                return <Icon className="h-10 w-10" key={index} />;
              })}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="grid gap-2">
        <CheckoutDetails itemCount={itemCount} subTotal={subTotal} />
        <div className="mt-1.5">
          <Button size="sm" className="w-full">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
