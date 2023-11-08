"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";

import { cartItems } from "@/db/schema";

import { authOptions } from "@/lib/auth";
import { getSession } from "@/lib/session";

async function getUserCartItems(userId: string) {
  const userCartItems = await db.query.cartItems.findMany({
    where: eq(cartItems.userId, userId),
    with: { product: true },
  });
  return userCartItems;
}

export async function getCurrentUserCartItems() {
  try {
    const session = await getSession();
    if (!session) return [];

    return await getUserCartItems(session.user.id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function toggleCartItem(productId: string) {
  try {
    const session = await getSession();
    if (!session) {
      redirect(authOptions.pages?.signIn || "/login");
    }

    const exitingCartItem = await db.query.cartItems.findFirst({
      where: and(
        eq(cartItems.userId, session.user.id),
        eq(cartItems.productId, productId)
      ),
    });

    if (!exitingCartItem) {
      await db
        .insert(cartItems)
        .values({ userId: session.user.id, productId: productId });
      return true;
    }

    await db
      .delete(cartItems)
      .where(
        and(
          eq(cartItems.userId, exitingCartItem.userId),
          eq(cartItems.productId, exitingCartItem.productId)
        )
      );
    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
