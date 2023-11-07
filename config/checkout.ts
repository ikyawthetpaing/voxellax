import { IconType } from "@/types";

import { formatPrice } from "@/lib/utils";

enum CheckoutType {
  CreditCard = "CreditCard",
  PayPal = "PayPal",
  GPay = "GPay",
}
type CheckoutOptionType = {
  type: CheckoutType;
  icons: IconType[];
};
type Fee = {
  label: string;
  priceLabel: string;
};

export const defaultCheckoutType: CheckoutType = CheckoutType.PayPal;
export const checkoutOptions: CheckoutOptionType[] = [
  {
    type: CheckoutType.CreditCard,
    icons: ["visa", "master"],
  },
  {
    type: CheckoutType.PayPal,
    icons: ["paypal"],
  },
  {
    type: CheckoutType.GPay,
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

  const totalPrice = subTotal + PLATFORM_FEE * itemCount + SHIPPING_FEE;

  return { totalPrice, fees };
}
