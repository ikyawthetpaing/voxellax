"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

import { getSession } from "@/lib/session";

export async function getUserAction(userId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  return user;
}

export async function getCurrentUserAction() {
  const session = await getSession();
  const user = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id || ""),
  });
  return user;
}

export async function approveSellerAction(userId: string) {
  await db.update(users).set({ role: "seller" }).where(eq(users.id, userId));
}
