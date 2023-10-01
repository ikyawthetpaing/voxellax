"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";

import { likes } from "@/db/schema";

import { authOptions } from "@/lib/auth";
import { getSession } from "@/lib/session";

// export async function isUserLiked(productId: string) {
//   try {
//     const session = await getSession();
//     if (!session) {
//       return false;
//     }

//     const likedProduct = await db.query.likes.findFirst({
//       where: and(
//         eq(likes.userId, session.user.id),
//         eq(likes.productId, productId)
//       ),
//     });

//     return !!likedProduct;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

export async function getUserLikes(userId: string) {
  const userLikes = await db.query.likes.findMany({
    where: eq(likes.userId, userId),
  });
  return userLikes;
}

export async function getCurrentUserLikes() {
  try {
    const session = await getSession();
    if (!session) {
      return [];
    }

    const currentUserLikes = await getUserLikes(session.user.id);

    return currentUserLikes;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function toggleLike(productId: string) {
  try {
    const session = await getSession();
    if (!session) {
      redirect(authOptions.pages?.signIn || "/login");
    }

    const exitingLike = await db.query.likes.findFirst({
      where: and(
        eq(likes.userId, session.user.id),
        eq(likes.productId, productId)
      ),
    });

    if (!exitingLike) {
      await db
        .insert(likes)
        .values({ userId: session.user.id, productId: productId });
      return true;
    }

    await db
      .delete(likes)
      .where(
        and(
          eq(likes.userId, exitingLike.userId),
          eq(likes.productId, exitingLike.productId)
        )
      );
    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
