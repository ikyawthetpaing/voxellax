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

import { Collection } from "@/db/schema";

import { getCurrentUserCollections } from "@/lib/actions/collections";

type UserCollectionsContextType = {
  collections: Collection[];
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export const UserCollectionsContext = createContext<
  UserCollectionsContextType | undefined
>(undefined);

export function useUserCollections() {
  const context = useContext(UserCollectionsContext);
  if (!context) {
    throw Error(
      "useUserCollections must be used within UserCollectionsProvdier"
    );
  }
  return context;
}

export function UserCollectionsProvdier({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      startTransition(async () => {
        const data = await getCurrentUserCollections();
        setCollections(data);
      });
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <UserCollectionsContext.Provider
      value={{
        collections,
        refresh,
        setRefresh,
        loading: isPending,
      }}
    >
      {children}
    </UserCollectionsContext.Provider>
  );
}
