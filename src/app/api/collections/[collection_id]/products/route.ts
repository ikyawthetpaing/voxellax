import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { collectionPatchSchema } from "@/lib/validations/collection";
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

    const collectionProducts = await db.collectionProduct.findMany({
      where: { collectionId: params.collection_id },
    });

    console.log(collectionProducts);

    return new Response(JSON.stringify(collectionProducts), { status: 200 });
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

    const json = await req.json();
    const body = collectionPatchSchema.parse(json);

    const exitingCollectionProduct = await db.collectionProduct.findFirst({
      where: {
        productId: body.productId,
        collectionId: params.collection_id,
      },
    });

    if (exitingCollectionProduct) {
      await db.collectionProduct.delete({
        where: {
          id: exitingCollectionProduct.id,
        },
      });
    } else {
      await db.collectionProduct.create({
        data: { productId: body.productId, collectionId: params.collection_id },
      });
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
