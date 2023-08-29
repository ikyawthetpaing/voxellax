"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { cartItems } from "@/db/schema";
import { and, eq } from "drizzle-orm";

import { getSession } from "@/lib/session";

import { authOptions } from "../auth";

export async function isUserAddedCartItem(productId: string) {
  try {
    const session = await getSession();

    const addedCartItem = await db.query.cartItems.findFirst({
      where: and(
        eq(cartItems.userId, session?.user.id || ""),
        eq(cartItems.productId, productId)
      ),
    });

    return !!addedCartItem;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getUserCartItemsAction(userId: string) {
  const userCartItems = await db.query.cartItems.findMany({
    where: eq(cartItems.userId, userId),
    with: { product: true },
  });
  return userCartItems;
}

export async function getCurrentUserCartItemsAction() {
  try {
    // Get session information
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const currentUserCartItems = await getUserCartItemsAction(session.user.id);
    return currentUserCartItems;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function cartToggleAction(productId: string) {
  try {
    // Get session information
    const session = await getSession();
    if (!session) {
      redirect(authOptions.pages?.signIn || "/login");
      // throw new Error("Unauthorized");
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
