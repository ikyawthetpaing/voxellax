"use server";

import { db } from "@/db";
import { Product, products } from "@/db/schema";
import { and, asc, desc, eq, gte, inArray, lte } from "drizzle-orm";
import { utapi } from "uploadthing/server";

import { getSession } from "@/lib/session";
import { generatedId } from "@/lib/utils";
import {
  AddProductSchema,
  GetProductsSchema,
  UpdateProductSchema,
} from "@/lib/validations/product";

export async function getProduct(productId: string) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  });
  return product;
}

export async function getProducts(input: GetProductsSchema) {
  const [column, order] =
    (input.sort?.split(".") as [
      keyof Product | undefined,
      "asc" | "desc" | undefined,
    ]) ?? [];
  const [minPrice, maxPrice] = input.price_range?.split("-") ?? [];
  const categories =
    (input.categories?.split(".") as Product["category"][]) ?? [];
  const subcategories = input.subcategories?.split(".") ?? [];
  const storeIds = input.store_ids?.split(".").map(String) ?? [];

  const items = await db.transaction(async (tx) => {
    return await tx
      .select()
      .from(products)
      .limit(input.limit)
      .offset(input.offset)
      .where(
        and(
          categories.length
            ? inArray(products.category, categories)
            : undefined,
          subcategories.length
            ? inArray(products.subcategory, subcategories)
            : undefined,
          minPrice ? gte(products.price, Number(minPrice)) : undefined,
          maxPrice ? lte(products.price, Number(maxPrice)) : undefined,
          storeIds.length ? inArray(products.storeId, storeIds) : undefined
        )
      )
      .orderBy(
        column && column in products
          ? order === "asc"
            ? asc(products[column])
            : desc(products[column])
          : desc(products.createdAt)
      );
  });

  return items;
}

export async function addProduct(data: AddProductSchema, storeId: string) {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    await db.insert(products).values({
      id: generatedId(data.name),
      name: data.name,
      description: data.description,
      category: data.category,
      subcategory: data.subcategory,
      price: Number(data.price),
      images: data.images,
      files: data.files,
      storeId: storeId,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateProduct(
  data: UpdateProductSchema,
  productId: string
) {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const product = await getProduct(productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    if (product.images) {
      const removedImageKeys = product.images
        .map((image) => image.key)
        .filter((key) => !data.images.some((image) => image.key === key));

      try {
        await utapi.deleteFiles(removedImageKeys);
      } catch (deleteError) {
        console.error(
          "Error deleting product images on uploadthing:",
          deleteError
        );
      }
    }

    if (product.files) {
      const removedFileKeys = product.files
        .map((file) => file.key)
        .filter((key) => !data.files.some((file) => file.key === key));

      try {
        await utapi.deleteFiles(removedFileKeys);
      } catch (deleteError) {
        console.error(
          "Error deleting product files on uploadthing:",
          deleteError
        );
      }
    }

    await db
      .update(products)
      .set({
        name: data.name,
        description: data.description,
        category: data.category,
        subcategory: data.subcategory,
        price: Number(data.price),
        images: data.images,
        files: data.files,
      })
      .where(eq(products.id, productId));
  } catch (error) {
    console.error(error);
    throw error;
  }
}
