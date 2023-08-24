"use server";

// Import necessary modules and types
import { db } from "@/db"; // Import database connection
import { stores } from "@/db/schema"; // Import schema for stores
import { and, eq, ne } from "drizzle-orm"; // Import query operators from drizzle-orm
import { utapi } from "uploadthing/server"; // Import the uploadthing server module

import { getSession } from "@/lib/session"; // Import session-related functions
import { AddStoreSchema, UpdateStoreSchema } from "@/lib/validations/store"; // Import schema types for validation

// Retrieve store information by storeId
export async function getStoreAction(storeId: string) {
  const store = await db.query.stores.findFirst({
    where: eq(stores.id, storeId),
  });
  return store;
}

export async function getUserStoreAction(userId: string) {
  return await db.query.stores.findFirst({ where: eq(stores.userId, userId) });
}

// Retrieve the current user's store
export async function getCurrentUserStore() {
  const session = await getSession();
  if (!session) {
    return undefined;
  }
  const store = await getUserStoreAction(session.user.id);
  return store;
}

// Check if the current user has a store
export async function isCurrentUserHaveStore() {
  const store = await getCurrentUserStore();
  return !!store;
}

// Add a new store to the database
export async function addStoreAction(data: AddStoreSchema) {
  try {
    // Get session information
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Validate store ID
    const validStoreId = await isValidStoreId(data.id);
    if (!validStoreId) {
      throw new Error("Handle already taken.");
    }

    // Insert store information into the 'stores' table
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

// Update an existing store in the database
export async function updateStoreAction(
  data: UpdateStoreSchema,
  storeId: string
) {
  try {
    // Get session information
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Validate store ID
    const validStoreId = await isValidStoreId(data.id);
    if (!validStoreId) {
      throw new Error("Handle already taken.");
    }

    // Find the store in the database
    const store = await db.query.stores.findFirst({
      where: eq(stores.id, storeId),
    });
    if (!store) {
      throw new Error("Store not found");
    }

    // Delete files if needed
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

    // Update store information in the 'stores' table
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

// Delete a store from the database
export async function deleteStoreAction(storeId: string) {
  try {
    // Get session information
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Find the store in the database
    const store = await db.query.stores.findFirst({
      where: eq(stores.id, storeId),
    });
    if (!store) {
      throw new Error("Store not found");
    }

    // Delete files associated with the store
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

    // Delete the store from the 'stores' table
    await db.delete(stores).where(eq(stores.id, store.id));
  } catch (error) {
    console.error("Error deleting store:", error);
    throw error;
  }
}

// Check if a store ID is valid and not associated with the current user
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
