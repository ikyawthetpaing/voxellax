"use server";

import { db } from "@/db";
import { PurchasedProduct } from "@/types";
import cuid from "cuid";
import { eq } from "drizzle-orm";

import { Product, Purchase, users } from "@/db/schema";

import { getProduct } from "@/lib/actions/product";
import { getSession } from "@/lib/session";
import { generateSalt, hashPassword } from "@/lib/utils";
import { UserSignUpSchema } from "@/lib/validations/auth";

import { getUserPurchases } from "./purchase";

export async function addUser(
  data: UserSignUpSchema
): Promise<{ ok: boolean; error?: string }> {
  const existingUser = await getUserByEmail(data.email);

  if (existingUser) {
    return { ok: false, error: "Email already taken" };
  }

  try {
    const salt = generateSalt();

    await db.insert(users).values({
      id: cuid(),
      name: `${data.firstName.trim()} ${data.lastName.trim()}`,
      email: data.email,
      emailVerified: null,
      password: {
        hashedPassword: hashPassword(data.password, salt),
        salt: salt,
      },
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: "Error adding the user to the database" };
  }
}

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  return user;
}

export async function getUser(userId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  return user;
}

export async function getCurrentUser() {
  const session = await getSession();
  const user = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id || ""),
  });
  return user;
}

export async function approveSeller(userId: string) {
  await db.update(users).set({ role: "seller" }).where(eq(users.id, userId));
}

export async function getUserPurchasedProducts() {
  const userPurchases = await getUserPurchases();

  const purchasedProducts: PurchasedProduct[] = [];

  await Promise.all(
    userPurchases.map(async (purchase) => {
      const product = await getProduct(purchase.productId);

      if (product) {
        return purchasedProducts.push({ ...product, ...purchase });
      }
    })
  );

  return purchasedProducts;
}
