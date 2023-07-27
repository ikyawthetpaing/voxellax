import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { collectionPostSchema } from "@/lib/validations/collection";
import { getServerSession } from "next-auth";
import * as z from "zod";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const collections = await db.collection.findMany({
      where: { userId: session.user.id },
    });

    return new Response(JSON.stringify(collections), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = collectionPostSchema.parse(json);

    await db.collection.create({
      data: { name: body.name, privacy: body.privacy, userId: session.user.id },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
