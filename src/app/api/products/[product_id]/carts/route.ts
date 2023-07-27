import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { cartPatchSchema } from "@/lib/validations/cart";
import { getServerSession } from "next-auth";
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
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    const cartProduct = await db.cart.findFirst({
      where: { productId: params.product_id, userId: session.user.id },
    });

    return new Response(JSON.stringify(cartProduct), { status: 200 });
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

    const existingCartProduct = await db.cart.findFirst({
      where: { productId: params.product_id, userId: session.user.id },
    });

    if (existingCartProduct) {
      await db.cart.delete({ where: { id: existingCartProduct.id } });
    } else {
      await db.cart.create({
        data: { productId: params.product_id, userId: session.user.id },
      });
    }

    return new Response("Success", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(
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

    const existingCartProduct = await db.cart.findFirst({
      where: { productId: params.product_id, userId: session.user.id },
    });

    if (existingCartProduct) {
      const json = await req.json();
      const body = cartPatchSchema.parse(json);
      await db.cart.update({
        where: { id: existingCartProduct.id },
        data: { purchaseLicenseId: body.purchaseLicenseId },
      });
    } else {
      return new Response("not found", { status: 404 });
    }

    return new Response("Success", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function DELETE(
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

    const existingCartProduct = await db.cart.findFirst({
      where: { productId: params.product_id, userId: session.user.id },
    });

    if (existingCartProduct) {
      await db.cart.delete({ where: { id: existingCartProduct.id } });
    } else {
      return new Response("not found", { status: 404 });
    }

    return new Response("Success", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
