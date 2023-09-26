"use server";

import { db } from "@/db";
import { and, eq, ne } from "drizzle-orm";
import { utapi } from "uploadthing/server";

import { stores } from "@/db/schema";

import { getSession } from "@/lib/session";
import { AddStoreSchema, UpdateStoreSchema } from "@/lib/validations/store";

export async function getStore(storeId: string) {
  const store = await db.query.stores.findFirst({
    where: eq(stores.id, storeId),
  });
  return store;
}

export async function getUserStore(userId: string) {
  return await db.query.stores.findFirst({ where: eq(stores.userId, userId) });
}

export async function getCurrentUserStore() {
  const session = await getSession();
  if (!session) {
    return undefined;
  }
  const store = await getUserStore(session.user.id);
  return store;
}

export async function isCurrentUserHaveStore() {
  const store = await getCurrentUserStore();
  return !!store;
}

export async function addStore(data: AddStoreSchema) {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const validStoreId = await isValidStoreId(data.id);
    if (!validStoreId) {
      throw new Error("Handle already taken.");
    }

    await db.insert(stores).values({
      id: data.id,
      name: data.name,
      description: data.description,
      contactEmail: data.contactEmail,
      avatar: data.avatar,
      cover: data.cover,
      userId: session.user.id,
    });
  } catch (error) {
    console.error("Error adding store:", error);
    throw error;
  }
}

export async function updateStore(data: UpdateStoreSchema, storeId: string) {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const validStoreId = await isValidStoreId(data.id);
    if (!validStoreId) {
      throw new Error("Handle already taken.");
    }

    const store = await db.query.stores.findFirst({
      where: eq(stores.id, storeId),
    });
    if (!store) {
      throw new Error("Store not found");
    }

    if (data.avatar && store.avatar) {
      try {
        await utapi.deleteFiles(store.avatar.key);
      } catch (deleteError) {
        console.error("Error deleting avatar on uploadthing:", deleteError);
      }
    }
    if (data.cover && store.cover) {
      try {
        await utapi.deleteFiles(store.cover.key);
      } catch (deleteError) {
        console.error("Error deleting cover on uploadthing:", deleteError);
      }
    }

    await db
      .update(stores)
      .set({
        id: data.id,
        name: data.name,
        description: data.description,
        avatar: data.avatar,
        cover: data.cover,
        contactEmail: data.contactEmail,
      })
      .where(eq(stores.id, storeId));
  } catch (error) {
    console.error("Error updating store:", error);
    throw error;
  }
}

export async function deleteStore(storeId: string) {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const store = await db.query.stores.findFirst({
      where: eq(stores.id, storeId),
    });
    if (!store) {
      throw new Error("Store not found");
    }

    if (store.avatar) {
      try {
        await utapi.deleteFiles(store.avatar.key);
      } catch (deleteError) {
        console.error(
          "Error deleting avatar image on uploadthing:",
          deleteError
        );
      }
    }
    if (store.cover) {
      try {
        await utapi.deleteFiles(store.cover.key);
      } catch (deleteError) {
        console.error(
          "Error deleting cover image on uploadthing:",
          deleteError
        );
      }
    }

    await db.delete(stores).where(eq(stores.id, store.id));
  } catch (error) {
    console.error("Error deleting store:", error);
    throw error;
  }
}

export async function isValidStoreId(storeId: string) {
  const session = await getSession();

  const store = await db.query.stores.findFirst({
    where: and(
      eq(stores.id, storeId),
      ne(stores.userId, session?.user.id || "")
    ),
  });

  return !store;
}
