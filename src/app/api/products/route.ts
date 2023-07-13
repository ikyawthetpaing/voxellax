import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const products = await db.product.findMany();

    return new Response(JSON.stringify(products));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
