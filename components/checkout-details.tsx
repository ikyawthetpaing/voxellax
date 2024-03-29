import { getCalculatedFees } from "@/config/checkout";

import { formatPrice } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface Props {
  itemCount: number;
  subTotal: number;
}

export function CheckoutDetails({ itemCount, subTotal }: Props) {
  const { fees, totalPrice } = getCalculatedFees({ itemCount, subTotal });
  return (
    <>
      {fees.map((fee, index) => (
        <div key={index} className="flex justify-between gap-6">
          <span className="font-medium">{fee.label}</span>
          <span className="font-light">{fee.priceLabel}</span>
        </div>
      ))}
      <Separator className="my-1.5" />
      <div className="flex justify-between gap-6 font-medium">
        <span>Total</span>
        <span>{formatPrice(totalPrice, 2)}</span>
      </div>
    </>
  );
}
