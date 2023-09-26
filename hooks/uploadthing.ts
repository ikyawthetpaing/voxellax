import { generateReactHelpers } from "@uploadthing/react/hooks";

import { catchError } from "@/lib/utils";
import { OurFileRouter } from "@/app/api/uploadthing/core";

const { useUploadThing: _useUploadThing } =
  generateReactHelpers<OurFileRouter>();

export function useUploadThing(
  uploader:
    | "productFileUploader"
    | "productImageUploader"
    | "coverImageUploader"
    | "avatarImageUploader"
) {
  const { isUploading, startUpload } = _useUploadThing(uploader, {
    onUploadError: (err) => {
      catchError(err);
    },
  });

  return { isUploading, startUpload };
}
