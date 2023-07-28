import { PRODUCT_DEFAULT_PRICE } from "@/constants/product";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { productPostSchema } from "@/lib/validations/product";
import { getServerSession } from "next-auth";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    store_id: z.string(),
  }),
});

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this store.
    if (!(await verifyCurrentUserHasAccessToStore(params.store_id))) {
      return new Response(null, { status: 403 });
    }

    const json = await req.json();
    const body = productPostSchema.parse(json);

    console.log(body);

    // Convert license price to number
    const licenses = body.licenses.map((license) => ({
      type: license.type,
      price: license.price ? Number(license.price) : PRODUCT_DEFAULT_PRICE,
    }));

    // First create product data on the database
    const product = await db.product.create({
      data: {
        name: body.name,
        description: body.description,
        licenses: { create: licenses },
        category: body.category,
        subcategory: body.subcategory,
        storeId: params.store_id,
      },
      select: {
        id: true,
      },
    });

    // Link images to product images
    for (const { key, index, isThumbnail } of body.images) {
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
          productImagesId: product.id,
        },
      });
    }

    // Link files to product files
    if (body.files) {
      await Promise.all(
        body.files.map(async ({ key }) => {
          const file = await db.file.findUnique({
            where: { key: key },
            select: { id: true },
          });

          await db.file.update({
            where: {
              id: file?.id,
            },
            data: {
              productFilesId: product.id,
            },
          });
        })
      );
    }

    return new Response("Success", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new Response(null, { status: 500 });
  }

  // try {
  //   const { params } = routeContextSchema.parse(context);

  //   // Check if the user has access to this store.
  //   if (!(await verifyCurrentUserHasAccessToStore(params.store_id))) {
  //     return new Response(null, { status: 403 });
  //   }

  //   const json = await req.json();
  //   const body = productPostSchema.parse(json);

  //   console.log(body);

  //   // Convert license price to number
  //   const licenses = body.licenses.map((license) => {
  //     if (!license.price) {
  //       return { type: license.type, price: PRODUCT_DEFAULT_PRICE };
  //     }
  //     return { type: license.type, price: Number(license.price) };
  //   });

  //   // First create product data on database
  //   const product = await db.product.create({
  //     data: {
  //       name: body.name,
  //       description: body.description,
  //       licenses: { create: licenses },
  //       category: body.category,
  //       subcategory: body.subcategory,
  //       storeId: params.store_id,
  //     },
  //     select: {
  //       id: true,
  //     },
  //   });

  //   // Link images to product images
  //   body.images.forEach(async ({ key, index, isThumbnail }) => {
  //     const file = await db.file.findUnique({
  //       where: { key: key },
  //       select: { id: true },
  //     });

  //     await db.file.update({
  //       where: {
  //         id: file?.id,
  //       },
  //       data: {
  //         index: index,
  //         isThumbnail: isThumbnail,
  //         productImagesId: product.id,
  //       },
  //     });
  //   });

  //   // Link files to product files
  //   body.files?.forEach(async ({ key }) => {
  //     const file = await db.file.findUnique({
  //       where: { key: key },
  //       select: { id: true },
  //     });

  //     await db.file.update({
  //       where: {
  //         id: file?.id,
  //       },
  //       data: {
  //         productFilesId: product.id,
  //       },
  //     });
  //   });
  //   return new Response(JSON.stringify(product), { status: 200 });
  // } catch (error) {
  //   if (error instanceof z.ZodError) {
  //     return new Response(JSON.stringify(error.issues), { status: 422 });
  //   }
  //   return new Response(null, { status: 500 });
  // }
}

async function verifyCurrentUserHasAccessToStore(store_id: string) {
  const session = await getServerSession(authOptions);
  const count = await db.store.count({
    where: {
      id: store_id,
      userId: session?.user.id,
    },
  });

  return count > 0;
}
