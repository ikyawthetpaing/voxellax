"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { likes } from "@/db/schema";
import { and, eq } from "drizzle-orm";

import { getSession } from "@/lib/session";

import { authOptions } from "../auth";

export async function isUserLiked(productId: string) {
  try {
    const session = await getSession();
    // if (!session) {
    //   throw new Error("Unauthorized");
    // }

    const likedProduct = await db.query.likes.findFirst({
      where: and(
        eq(likes.userId, session?.user.id || ""),
        eq(likes.productId, productId)
      ),
    });

    return !!likedProduct;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getUserLikesAction(userId: string) {
  const userLikes = await db.query.likes.findMany({
    where: eq(likes.userId, userId),
  });
  return userLikes;
}

export async function getCurrentUserLikesAction() {
  try {
    // Get session information
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const currentUserLikes = await getUserLikesAction(session.user.id);
    return currentUserLikes;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function likeToggleAction(productId: string) {
  try {
    // Get session information
    const session = await getSession();
    if (!session) {
      redirect(authOptions.pages?.signIn || "/login");
      // throw new Error("Unauthorized");
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
