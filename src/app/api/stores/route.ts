import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { storePostSchema } from "@/lib/validations/store";
import * as z from "zod";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const stores = await db.store.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
      where: {
        userId: session.user.id,
      },
    });

    return new Response(JSON.stringify(stores));
  } catch (error) {
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
    const body = storePostSchema.parse(json);

    const isStoreIdTaken = await db.store.findFirst({
      where: { id: body.id },
    });

    if (isStoreIdTaken) {
      return new Response("Already taken", { status: 409 });
    }

    const profileImage = await db.file.findFirst({
      where: { key: body.profileImage?.key },
      select: { url: true },
    });

    const coverImage = await db.file.findFirst({
      where: { key: body.coverImage?.key },
      select: { url: true },
    });

    await db.store.create({
      data: {
        id: body.id,
        name: body.name,
        description: body.description,
        userId: session.user.id,
        profileImageUrl: profileImage?.url,
        coverImageUrl: coverImage?.url,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new Response(null, { status: 500 });
  }
}
