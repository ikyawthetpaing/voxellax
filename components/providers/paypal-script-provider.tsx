"use client";

import { PayPalScriptProvider as DefaultPayPalScriptProvider } from "@paypal/react-paypal-js";

import { env } from "@/env.mjs";

interface Props {
  children: React.ReactNode;
}

export function PayPalScriptProvider({ children }: Props) {
  return (
    <DefaultPayPalScriptProvider
      options={{ clientId: env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
    >
      {children}
    </DefaultPayPalScriptProvider>
  );
}
