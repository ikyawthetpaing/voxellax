"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { ProductImageUploadedFile } from "@/types";
import { and, eq } from "drizzle-orm";

import { collectionProducts, collections } from "@/db/schema";

import { getProductThumbnail } from "@/lib/actions/product";
import { authOptions } from "@/lib/auth";
import { getSession } from "@/lib/session";
import { generatedId } from "@/lib/utils";
import { CollectionSchema } from "@/lib/validations/collection";

export async function getUserCollections(userId: string) {
  try {
    const _collections = await db.query.collections.findMany({
      where: eq(collections.userId, userId),
    });

    return _collections;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getCurrentUserCollections() {
  try {
    const session = await getSession();
    if (!session) {
      return [];
    }

    const _collections = await getUserCollections(session.user.id);

    return _collections;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createCollection(input: CollectionSchema) {
  const session = await getSession();
  if (!session) {
    redirect(authOptions.pages?.signIn || "/login");
  }

  await db.insert(collections).values({
    id: generatedId(input.name),
    name: input.name,
    privacy: input.privacy,
    userId: session.user.id,
  });
}

export async function getCollectionThumbnails(
  collectionId: string,
  count: number
) {
  const _collectionProducts = await db.query.collectionProducts.findMany({
    where: eq(collectionProducts.collectionId, collectionId),
    limit: count,
  });
  if (!_collectionProducts) return [];

  const thumbnails: ProductImageUploadedFile[] = [];

  for (const collectionProduct of _collectionProducts) {
    const productThumbnail = await getProductThumbnail(
      collectionProduct.productId
    );
    if (productThumbnail) {
      thumbnails.push(productThumbnail);
    }
  }

  return thumbnails;
}

export async function getCollection(collectionId: string) {
  const collection = await db.query.collections.findFirst({
    where: eq(collections.id, collectionId),
  });
  return collection;
}

export async function getCollectionProduct(
  collectionId: string,
  productId: string
) {
  const collectionProduct = await db.query.collectionProducts.findFirst({
    where: and(
      eq(collectionProducts.collectionId, collectionId),
      eq(collectionProducts.productId, productId)
    ),
  });
  return collectionProduct;
}

export async function getCollectionProducts(collectionId: string) {
  const _collectionProducts = await db.query.collectionProducts.findMany({
    where: eq(collectionProducts.collectionId, collectionId),
  });
  return _collectionProducts;
}

export async function toggleCollectionProduct(
  collectionId: string,
  productId: string
) {
  const exiting = await getCollectionProduct(collectionId, productId);

  if (!exiting) {
    await db.insert(collectionProducts).values({ collectionId, productId });
    return { added: true };
  }

  await db
    .delete(collectionProducts)
    .where(
      and(
        eq(collectionProducts.collectionId, collectionId),
        eq(collectionProducts.productId, productId)
      )
    );
  return { added: false };
}
