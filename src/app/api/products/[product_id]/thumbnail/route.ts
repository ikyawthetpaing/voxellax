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

    const thumbnail = await db.file.findFirst({
      where: {
        productImagesId: params.product_id,
        isThumbnail: true,
      },
    });

    return new Response(JSON.stringify(thumbnail));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
