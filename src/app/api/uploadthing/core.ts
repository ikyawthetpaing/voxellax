import { PRODUCT_IMAGE_FILE_MAX_COUNT } from "@/constants/product";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  productImage: f({
    image: { maxFileSize: "4MB", maxFileCount: PRODUCT_IMAGE_FILE_MAX_COUNT },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async (_req) => {
      // This code runs on your server before upload
      const user = await getCurrentUser();

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    // eslint-disable-next-line @typescript-eslint/require-await
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          url: file.url,
          size: file.size,
        },
      });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
