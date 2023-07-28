import * as z from "zod";
import { getServerSession } from "next-auth";

import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { storePatchSchema } from "@/lib/validations/store";

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

    // Update the store.
    await db.store.update({
      where: {
        id: params.store_id,
      },
      data: {
        name: body.name,
        description: body.description,
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
