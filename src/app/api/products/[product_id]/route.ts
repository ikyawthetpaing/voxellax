import { PRODUCT_DEFAULT_PRICE } from "@/constants/product";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { productPatchSchema } from "@/lib/validations/product";
import { getServerSession } from "next-auth";
import { utapi } from "uploadthing/server";
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

    const product = await db.product.findFirst({
      where: { id: params.product_id },
    });

    return new Response(JSON.stringify(product), { status: 200 });
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
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToProduct(params.product_id))) {
      return new Response(null, { status: 403 });
    }

    // Get file keys from database
    const files = await db.file.findMany({
      where: {
        OR: [
          { productFilesId: params.product_id },
          { productImagesId: params.product_id },
        ],
      },
      select: {
        key: true,
      },
    });

    // Delet file on uploadthing via key
    files.forEach((file) => utapi.deleteFiles(file.key));

    // Delete the product
    await db.product.delete({
      where: {
        id: params.product_id,
      },
    });

    return new Response(null, { status: 204 });
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
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToProduct(params.product_id))) {
      return new Response(null, { status: 403 });
    }

    const json = await req.json();
    const body = productPatchSchema.parse(json);

    console.log(body);

    // Link added images
    body.images.added.forEach(async ({ key, index, isThumbnail }) => {
      const file = await db.file.findUnique({
        where: { key: key },
        select: { id: true },
      });

      await db.file.update({
        where: {
          id: file?.id,
        },
        data: {
          index: index,
          isThumbnail: isThumbnail,
          productImagesId: params.product_id,
        },
      });
    });

    // Delete product images
    body.images.deleted.forEach(async ({ key }) => {
      const file = await db.file.findUnique({
        where: { key: key },
        select: { id: true, key: true },
      });

      // Delet file on uploadthing via key
      utapi.deleteFiles(file!.key);

      await db.file.delete({ where: { id: file?.id } });
    });

    // Update product images
    body.images.updated.forEach(async ({ key, index, isThumbnail }) => {
      const file = await db.file.findUnique({
        where: { key: key },
        select: { id: true, key: true },
      });

      await db.file.update({
        where: { id: file?.id },
        data: { index: index, isThumbnail },
      });
    });

    // Convert license price to number
    let licenses = undefined;
    if (body.licenses) {
      licenses =
        body.licenses.map((license) => {
          if (!license.price) {
            return { type: license.type, price: PRODUCT_DEFAULT_PRICE };
          }
          return { type: license.type, price: Number(license.price) };
        }) || undefined;
    }

    // Delete previous licenses
    await db.license.deleteMany({ where: { productId: params.product_id } });

    // Update the product
    await db.product.update({
      where: { id: params.product_id },
      data: {
        name: body.name,
        description: body.description,
        licenses: { create: licenses },
        category: body.category,
        subcategory: body.subcategory,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToProduct(product_id: string) {
  const session = await getServerSession(authOptions);
  const stores = await db.store.findMany({
    where: {
      userId: session?.user.id,
    },
    select: {
      id: true,
    },
  });

  let count = 0;

  for (const store of stores) {
    const productCount = await db.product.count({
      where: {
        id: product_id,
        storeId: store.id,
      },
    });

    count += productCount;
  }

  return count > 0;
}
