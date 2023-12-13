"use server";

import { db } from "@/db";
import { ActionResponse } from "@/types";
import { and, eq, sql } from "drizzle-orm";

import { Review, reviews } from "@/db/schema";

import { getSession } from "@/lib/session";

export async function getCurrentUserReview(
  productId: string
): Promise<Review | null> {
  const session = await getSession();

  if (!session) return null;

  const review = await db.query.reviews.findFirst({
    where: and(
      eq(reviews.userId, session.user.id),
      eq(reviews.productId, productId)
    ),
  });

  return review || null;
}

export async function getReviews(
  productId: string,
  {
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }
) {
  const { items, count } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(reviews)
      .where(eq(reviews.productId, productId))
      .limit(limit)
      .offset(offset);

    const count = await tx
      .select({
        count: sql<number>`count(*)`,
      })
      .from(reviews)
      .where(eq(reviews.productId, productId))
      .execute()
      .then((res) => res[0]?.count ?? 0);

    return {
      items,
      count,
    };
  });

  return {
    items,
    count,
  };
}

export async function addReview(
  input: Omit<Review, "userId" | "createdAt">
): Promise<ActionResponse> {
  try {
    const session = await getSession();

    if (!session) {
      return { statusCode: 403, ok: false, error: "Unauthorized" };
    }

    const newReview = {
      userId: session.user.id,
      productId: input.productId,
      rate: input.rate,
      message: input.message,
    };

    await db.insert(reviews).values(newReview);

    return { statusCode: 200, ok: true };
  } catch (error) {
    console.error("Error adding review:", error);
    return { statusCode: 500, ok: false, error: "Internal Server Error" };
  }
}

export async function updateReview(
  input: Pick<Review, "rate" | "message" | "productId">
): Promise<ActionResponse> {
  try {
    const session = await getSession();

    if (!session) {
      return { statusCode: 403, ok: false, error: "Unauthorized" };
    }

    const newReview = {
      rate: input.rate,
      message: input.message,
    };

    await db
      .update(reviews)
      .set(newReview)
      .where(
        and(
          eq(reviews.productId, input.productId),
          eq(reviews.userId, session.user.id)
        )
      );

    return { statusCode: 200, ok: true };
  } catch (error) {
    console.error("Error adding review:", error);
    return { statusCode: 500, ok: false, error: "Internal Server Error" };
  }
}

export async function deleteReview(
  input: Pick<Review, "productId">
): Promise<ActionResponse> {
  try {
    const session = await getSession();

    if (!session) {
      return { statusCode: 403, ok: false, error: "Unauthorized" };
    }

    await db
      .delete(reviews)
      .where(
        and(
          eq(reviews.productId, input.productId),
          eq(reviews.userId, session.user.id)
        )
      );

    return { statusCode: 200, ok: true };
  } catch (error) {
    console.error("Error adding review:", error);
    return { statusCode: 500, ok: false, error: "Internal Server Error" };
  }
}
