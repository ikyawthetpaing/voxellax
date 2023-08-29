"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { CartItem } from "@/db/schema";

import { getCurrentUserCartItemsAction } from "@/lib/actions/cart";

export const CartItemsContext = createContext<
  | {
      data: CartItem[];
      refresh: boolean;
      setRefresh: Dispatch<SetStateAction<boolean>>;
      loading: boolean;
    }
  | undefined
>(undefined);

export function CartItemsProvdier({ children }: { children: React.ReactNode }) {
  const [isPending, startTransition] = useTransition();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      startTransition(async () => {
        const data = await getCurrentUserCartItemsAction();
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
