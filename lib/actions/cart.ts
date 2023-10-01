"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";

import { cartItems } from "@/db/schema";

import { authOptions } from "@/lib/auth";
import { getSession } from "@/lib/session";

// export async function isUserAddedCartItem(productId: string) {
//   try {
//     const session = await getSession();
//     if (!session) {
//       return false;
//     }

//     const addedCartItem = await db.query.cartItems.findFirst({
//       where: and(
//         eq(cartItems.userId, session.user.id),
//         eq(cartItems.productId, productId)
//       ),
//     });

//     return !!addedCartItem;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

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
    if (!session) {
      return [];
    }

    const currentUserCartItems = await getUserCartItems(session.user.id);

    return currentUserCartItems;
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
