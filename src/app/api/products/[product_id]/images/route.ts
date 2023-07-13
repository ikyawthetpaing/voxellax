// /api/products/[product_id]/images
import { db } from "@/lib/db";
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
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Find the product images.
    const images = await db.image.findMany({
      where: {
        productId: params.product_id,
      },
    });

    // console.log(images);

    return new Response(JSON.stringify(images));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
