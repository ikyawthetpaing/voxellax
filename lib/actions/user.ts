"use server";

import { db } from "@/db";
import { Invoice, InvoiceProduct } from "@/types";
import { eq } from "drizzle-orm";

import { users } from "@/db/schema";

import { getProduct } from "@/lib/actions/product";
import { getSession } from "@/lib/session";

export async function getUse(userId: string) {
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

// still in dev
export async function getUserInvoiceProducts() {
  const devInvoices: Invoice[] = [
    {
      productId: "elegant-ai-generated-wall-art-printable-download-dn108sf",
      purchasedAt: new Date("2023-09-22T02:43:30.000Z"),
      cost: 69,
    },
    {
      productId:
        "unsplash-your-potential-unlock-creativity-inspiration-and-success-vj05b3z",
      purchasedAt: new Date("2023-09-22T02:43:30.000Z"),
      cost: 39,
    },
  ];

  const invoiceProducts: InvoiceProduct[] = [];

  await Promise.all(
    devInvoices.map(async (invoice) => {
      const product = await getProduct(invoice.productId);

      if (product) {
        invoiceProducts.push({ ...product, ...invoice });
      }
    })
  );

  return invoiceProducts;
}
