import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    collection_id: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    const collection = await db.collection.findFirst({
      where: { id: params.collection_id, userId: session.user.id },
    });

    return new Response(JSON.stringify(collection), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    await db.collection.delete({
      where: { id: params.collection_id, userId: session.user.id },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
