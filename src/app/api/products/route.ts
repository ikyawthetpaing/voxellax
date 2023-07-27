import { db } from "@/lib/db";

export async function GET() {
  try {
    const products = await db.product.findMany();
    return new Response(JSON.stringify(products));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
