"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { CartItem } from "@/db/schema";

import { getCurrentUserCartItems } from "@/lib/actions/cart";

type CartItemsContextType = {
  data: CartItem[];
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

const CartItemsContext = createContext<CartItemsContextType | undefined>(
  undefined
);

export function useCartItems() {
  const context = useContext(CartItemsContext);
  if (!context) {
    throw Error("useCartItems must be used within CartItemsProvdier.");
  }
  return context;
}

export function CartItemsProvdier({ children }: { children: React.ReactNode }) {
  const [isPending, startTransition] = useTransition();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      startTransition(async () => {
        const data = await getCurrentUserCartItems();
        setCartItems(data);
      });
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <CartItemsContext.Provider
      value={{
        data: cartItems,
        refresh: refresh,
        setRefresh: setRefresh,
        loading: isPending,
      }}
    >
      {children}
    </CartItemsContext.Provider>
  );
}
