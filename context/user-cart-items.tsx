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

type UserCartItemsContextType = {
  data: CartItem[];
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

const UserCartItemsContext = createContext<
  UserCartItemsContextType | undefined
>(undefined);

export function useUserCartItems() {
  const context = useContext(UserCartItemsContext);
  if (!context) {
    throw Error("useUserCartItems must be used within UserCartItemsProvdier.");
  }
  return context;
}

export function UserCartItemsProvdier({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <UserCartItemsContext.Provider
      value={{
        data: cartItems,
        refresh: refresh,
        setRefresh: setRefresh,
        loading: isPending,
      }}
    >
      {children}
    </UserCartItemsContext.Provider>
  );
}
