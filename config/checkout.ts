import { IconType } from "@/types";

import { formatPrice } from "@/lib/utils";

type CheckoutType = "credit_card" | "paypal" | "gpay";
type CheckoutOptionType = {
  type: CheckoutType;
  icons: IconType[];
};
type Fee = {
  label: string;
  priceLabel: string;
};

export const defaultCheckoutType: CheckoutType = "paypal";
export const checkoutOptions: CheckoutOptionType[] = [
  {
    type: "credit_card",
    icons: ["visa", "master"],
  },
  {
    type: "paypal",
    icons: ["paypal"],
  },
  {
    type: "gpay",
    icons: ["gpay"],
  },
];

export const PLATFORM_FEE = 0.96;
export const SHIPPING_FEE = 0;

export function getCalculatedFees({
  itemCount,
  subTotal,
}: {
  itemCount: number;
  subTotal: number;
}) {
  const fees: Fee[] = [
    {
      label: `Subtotal (${itemCount} ${itemCount > 1 ? "items" : "item"})`,
      priceLabel: `${formatPrice(subTotal, 2)}`,
    },
    {
      label: "Shipping",
      priceLabel: `${formatPrice(SHIPPING_FEE)}`,
    },
    {
      label: "Platform fee",
      priceLabel: `${formatPrice(PLATFORM_FEE, 2)}`,
    },
    {
      label: "Taxes",
      priceLabel: "Calculated at checkout",
    },
  ];

  const totalPrice = subTotal + PLATFORM_FEE + SHIPPING_FEE;

  return { totalPrice, fees };
}
