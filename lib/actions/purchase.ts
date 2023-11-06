"use server";

import { db } from "@/db";
import { and, eq } from "drizzle-orm";

import { Purchase, purchases } from "@/db/schema";

import { getSession } from "@/lib/session";

export async function getPurchase(
  input: Omit<Purchase, "createdAt" | "cost" | "userId">
) {
  const session = await getSession();
  if (!session) return null;

  const purchase = await db.query.purchases.findFirst({
    where: and(
      eq(purchases.userId, session.user.id),
      eq(purchases.productId, input.productId)
    ),
  });

  return purchase || null;
}

export async function getUserPurchases() {
  const session = await getSession();
  if (!session) return [];

  const purchase = await db.query.purchases.findMany({
    where: eq(purchases.userId, session.user.id),
  });

  return purchase;
}

export async function addPurchase(
  input: Omit<Purchase, "createdAt" | "userId">
) {
  const session = await getSession();
  if (!session) return;

  const existingPurchase = await getPurchase({ productId: input.productId });

  if (!existingPurchase) {
    await db.insert(purchases).values({ ...input, userId: session.user.id });
  }
}
