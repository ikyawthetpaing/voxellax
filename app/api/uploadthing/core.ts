import {
  PRODUCT_DIGITAL_FILE_MAX_SIZE,
  PRODUCT_IMAGE_FILE_MAX_SIZE,
} from "@/constants/product";
import {
  STORE_AVATAR_IMAGE_FILE_MAX_SIZE,
  STORE_COVER_IMAGE_FILE_MAX_SIZE,
} from "@/constants/store";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { getSession } from "@/lib/session";

const f = createUploadthing();

export const ourFileRouter = {
  avatarImageUploader: f({
    image: { maxFileSize: STORE_AVATAR_IMAGE_FILE_MAX_SIZE },
  })
    .middleware(async () => {
      const session = await getSession();
      if (!session) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async () => {}),
  coverImageUploader: f({
    image: { maxFileSize: STORE_COVER_IMAGE_FILE_MAX_SIZE },
  })
    .middleware(async () => {
      const session = await getSession();
      if (!session) throw new Error("Unauthorized");
      return { sessionId: session.user.id };
    })
    .onUploadComplete(async () => {}),
  productImageUploader: f({
    image: { maxFileSize: PRODUCT_IMAGE_FILE_MAX_SIZE },
  })
    .middleware(async () => {
      const session = await getSession();
      if (!session) throw new Error("Unauthorized");
      return { sessionId: session.user.id };
    })
    .onUploadComplete(async () => {}),
  productFileUploader: f({
    image: { maxFileSize: PRODUCT_DIGITAL_FILE_MAX_SIZE },
  })
    .middleware(async () => {
      const session = await getSession();
      if (!session) throw new Error("Unauthorized");
      return { sessionId: session.user.id };
    })
    .onUploadComplete(async () => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
