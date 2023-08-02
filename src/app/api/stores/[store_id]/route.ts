import * as z from "zod";
import { getServerSession } from "next-auth";

import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { storePatchSchema } from "@/lib/validations/store";
import { utapi } from "uploadthing/server";

const routeContextSchema = z.object({
  params: z.object({
    store_id: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this store.
    if (!(await verifyCurrentUserHasAccessToStore(params.store_id))) {
      return new Response(null, { status: 403 });
    }

    const store = await db.store.findFirst({
      where: {
        id: params.store_id,
      },
    });

    if (!store) {
      return new Response(null, { status: 404 });
    }

    // Delete store profile image
    const profileImage = await db.file.findFirst({
      where: { url: store.profileImageUrl ?? "" },
      select: { key: true, id: true },
    });

    if (profileImage) {
      await utapi.deleteFiles(profileImage.key); // Deleter on uploading cloud stroage
      await db.file.delete({ where: { id: profileImage.id } }); // Deleter on database
    }

    // Delete store cover image
    const coverImage = await db.file.findFirst({
      where: { url: store.coverImageUrl ?? "" },
      select: { key: true, id: true },
    });

    if (coverImage) {
      await utapi.deleteFiles(coverImage.key); // Deleter on uploading cloud stroage
      await db.file.delete({ where: { id: coverImage.id } }); // Deleter on database
    }

    // Delete the store.
    await db.store.delete({
      where: {
        id: params.store_id,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this store.
    if (!(await verifyCurrentUserHasAccessToStore(params.store_id))) {
      return new Response(null, { status: 403 });
    }

    // Get the request body and validate it.
    const json = await req.json();
    const body = storePatchSchema.parse(json);

    // Fetch the existing store data from the database
    const store = await db.store.findFirst({
      where: { id: params.store_id },
      select: { id: true, profileImageUrl: true, coverImageUrl: true },
    });

    if (!store) {
      return new Response(null, { status: 404 });
    }

    let profileImageUrl: string | undefined =
      store.profileImageUrl ?? undefined;
    let coverImageUrl: string | undefined = store.coverImageUrl ?? undefined;

    // Delete the previous profile image if a new one is provided
    if (body.profileImage && body.profileImage.added) {
      if (profileImageUrl) {
        await deleteImageByUrl(profileImageUrl);
      }
      const profileImage = await getFileUrlByKey(body.profileImage.added.key);
      profileImageUrl = profileImage;
    }

    // Delete the previous cover image if a new one is provided
    if (body.coverImage && body.coverImage.added) {
      if (coverImageUrl) {
        await deleteImageByUrl(coverImageUrl);
      }
      const coverImage = await getFileUrlByKey(body.coverImage.added.key);
      coverImageUrl = coverImage;
    }

    // Update the store.
    await db.store.update({
      where: { id: params.store_id },
      data: {
        id: body.id,
        name: body.name,
        description: body.description,
        profileImageUrl,
        coverImageUrl,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToStore(store_id: string) {
  const session = await getServerSession(authOptions);
  const count = await db.store.count({
    where: {
      id: store_id,
      userId: session?.user.id,
    },
  });

  return count > 0;
}

// Function to delete an image by its URL
async function deleteImageByUrl(url: string): Promise<void> {
  const isExitImage = await db.file.findFirst({
    where: { url },
    select: { id: true, key: true },
  });
  if (isExitImage) {
    await utapi.deleteFiles(isExitImage.key);
    await db.file.delete({ where: { id: isExitImage.id } });
  }
}

// Function to fetch the file URL by its key
async function getFileUrlByKey(key: string): Promise<string | undefined> {
  const image = await db.file.findFirst({
    where: { key },
    select: { url: true },
  });
  return image?.url;
}
