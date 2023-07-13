import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    product_id: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToProduct(params.product_id))) {
      return new Response(null, { status: 403 });
    }

    // Delete the post.
    await db.product.delete({
      where: {
        id: params.product_id,
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

async function verifyCurrentUserHasAccessToProduct(product_id: string) {
  const session = await getServerSession(authOptions);
  const stores = await db.store.findMany({
    where: {
      userId: session?.user.id
    },
    select: {
      id: true
    }
  });

  let count = 0;

  for (const store of stores) {
    const productCount = await db.product.count({
      where: {
        id: product_id,
        storeId: store.id,
      },
    });

    count += productCount;
  }

  return count > 0;
}
