import { getCalculatedFees } from "@/config/checkout";

import { formatPrice } from "@/lib/utils";

import { Separator } from "./ui/separator";

interface Props {
  itemCount: number;
  subTotal: number;
}

export function CheckoutDetails({ itemCount, subTotal }: Props) {
  const { fees, totalPrice } = getCalculatedFees({ itemCount, subTotal });
  return (
    <>
      {fees.map((fee) => (
        <div className="flex justify-between">
          <span className="font-medium">{fee.label}</span>
          <span className="font-light">{fee.priceLabel}</span>
        </div>
      ))}
      <Separator className="my-1.5" />
      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>{formatPrice(totalPrice, 2)}</span>
      </div>
    </>
  );
}
