import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { productSchema } from "@/lib/validations/product";
import { getServerSession } from "next-auth";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    store_id: z.string(),
  }),
});

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this store.
    if (!(await verifyCurrentUserHasAccessToStore(params.store_id))) {
      return new Response(null, { status: 403 });
    }

    const json = await req.json();
    const body = productSchema.parse(json);
    const licenses = body.licenses.map((license) => {
      if (!license.price) {

        return { type: license.type, price: 0.00 };
      }
      return { type: license.type, price: Number(license.price) };
    });

    const store = await db.product.create({
      data: {
        name: body.name,
        description: body.description,
        licenses: { create: licenses },
        category: body.category,
        subcategory: body.subcategory,
        images: { create: body.images },
        storeId: params.store_id,
      },
      select: {
        id: true,
      },
    });

    return new Response(JSON.stringify(store));
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
