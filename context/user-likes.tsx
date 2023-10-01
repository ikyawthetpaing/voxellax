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

import { Like } from "@/db/schema";

import { getCurrentUserLikes } from "@/lib/actions/like";

type UserLikesContextType = {
  data: Like[];
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

const UserLikesContext = createContext<UserLikesContextType | undefined>(
  undefined
);

export function useUserLikes() {
  const context = useContext(UserLikesContext);
  if (!context) {
    throw Error("useUserLikes must be used within UserLikesProvdier.");
  }
  return context;
}

export function UserLikesProvdier({ children }: { children: React.ReactNode }) {
  const [isPending, startTransition] = useTransition();
  const [likes, setLikes] = useState<Like[]>([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      startTransition(async () => {
        const data = await getCurrentUserLikes();
        setLikes(data);
      });
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <UserLikesContext.Provider
      value={{
        data: likes,
        refresh: refresh,
        setRefresh: setRefresh,
        loading: isPending,
      }}
    >
      {children}
    </UserLikesContext.Provider>
  );
}
