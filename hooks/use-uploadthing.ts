import { generateReactHelpers } from "@uploadthing/react/hooks";

import { toast } from "@/components/ui/use-toast";
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
    onUploadError: (error) => {
      console.error(error);
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return { isUploading, startUpload };
}
