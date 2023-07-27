import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    product_id: z.string(),
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

    const like = await db.like.findFirst({
      where: { productId: params.product_id, userId: session.user.id },
    });

    return new Response(JSON.stringify(like), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function POST(
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

    // Check if the user has already liked the post
    const existingLike = await db.like.findFirst({
      where: { productId: params.product_id, userId: session.user.id },
    });

    if (existingLike) {
      // Unlike the post
      await db.like.delete({ where: { id: existingLike.id } });
    } else {
      // Like the post
      await db.like.create({
        data: { productId: params.product_id, userId: session.user.id },
      });
    }

    return new Response("Success", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
