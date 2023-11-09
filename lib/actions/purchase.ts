"use server";

import { db } from "@/db";
import { ActionResponse } from "@/types";
import { and, eq } from "drizzle-orm";

import { Purchase, purchases } from "@/db/schema";

import { getSession } from "@/lib/session";

export async function getCurrentUserPurchase(
  input: Pick<Purchase, "productId">
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

export async function getCurrentUserPurchases() {
  const session = await getSession();
  if (!session) return [];

  const purchase = await db.query.purchases.findMany({
    where: eq(purchases.userId, session.user.id),
  });

  return purchase;
}

export async function addPurchase(
  input: Pick<Purchase, "productId" | "cost">
): Promise<ActionResponse> {
  const session = await getSession();
  if (!session) return { statusCode: 403, ok: false, error: "Unauthorized" };

  await db.insert(purchases).values({ ...input, userId: session.user.id });
  return { statusCode: 200, ok: true };
}
