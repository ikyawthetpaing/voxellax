import { db } from "@/lib/db";
import * as z from "zod";

const checkStoreSchema = z.object({ storeId: z.string() });

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = checkStoreSchema.parse(json);

    const store = await db.store.findFirst({
      where: { id: body.storeId },
    });

    if (!store) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
