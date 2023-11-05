import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { FileWithPreview } from "@/types";
import {
  useDropzone,
  type FileRejection,
  type FileWithPath,
} from "react-dropzone";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import {
  STORE_AVATAR_IMAGE_FILE_MAX_SIZE_BYTES,
  STORE_COVER_IMAGE_FILE_MAX_SIZE_BYTES,
} from "@/constants/store";

import { cn, formatBytes } from "@/lib/utils";
import { StoreSchema } from "@/lib/validations/store";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CropImageDialog } from "@/components/dialogs/crop-image-dialog";
import { Icons } from "@/components/icons";

interface StoreMediaFileFormProps {
  form: UseFormReturn<StoreSchema>;
  isUploading?: boolean;
  disabled?: boolean;
}

export function StoreMediaFileForm({
  form,
  isUploading = false,
  disabled = false,
}: StoreMediaFileFormProps) {
  const FileOnDrop = (name: "avatar" | "cover", maxSize: number) => {
    return useCallback(
      (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
        const addedFile = acceptedFiles[0];
        if (addedFile) {
          const newFile = Object.assign(addedFile, {
            preview: URL.createObjectURL(addedFile),
          }) as FileWithPreview;
          form.setValue(name, newFile);
        }

        if (rejectedFiles.length > 0) {
          rejectedFiles.forEach(({ errors }) => {
            if (errors[0]?.code === "file-too-large") {
              toast(`File is too large. Max size is ${formatBytes(maxSize)}`);
              return;
            }
            errors[0]?.message && toast(errors[0].message);
          });
        }
      },
      [maxSize, name]
    );
  };

  const {
    getRootProps: avatarImageGetRootProps,
    getInputProps: avatarImageGetInputProps,
    isDragActive: avatarImageIsDragActive,
  } = useDropzone({
    onDrop: FileOnDrop("avatar", STORE_AVATAR_IMAGE_FILE_MAX_SIZE_BYTES),
    accept: {
      "image/*": [],
    },
    maxSize: STORE_AVATAR_IMAGE_FILE_MAX_SIZE_BYTES,
    maxFiles: 1,
    multiple: false,
    disabled: disabled,
  });

  const {
    getRootProps: coverImageGetRootProps,
    getInputProps: coverImageGetInputProps,
    isDragActive: coverImageIsDragActive,
  } = useDropzone({
    onDrop: FileOnDrop("cover", STORE_COVER_IMAGE_FILE_MAX_SIZE_BYTES),
    accept: {
      "image/*": [],
    },
    maxSize: STORE_COVER_IMAGE_FILE_MAX_SIZE_BYTES,
    maxFiles: 1,
    multiple: false,
    disabled: disabled,
  });
  const [avatar, setAvatar] = useState<FileWithPreview | null>(null);
  const [cover, setCover] = useState<FileWithPreview | null>(null);

  useEffect(() => {
    setAvatar(form.getValues("avatar") || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("avatar")]);

  useEffect(() => {
    setCover(form.getValues("cover") || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("cover")]);

  return (
    <>
      <FormField
        control={form.control}
        name="avatar"
        render={({ field }) => (
          <FormItem>
            <div className="grid gap-2 lg:grid-cols-2">
              <div>
                <FormLabel>Store avatar</FormLabel>
                <FormDescription>
                  Appears on receipts, invoices, and more
                </FormDescription>
              </div>
              <FormControl>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24">
                    {!avatar ? (
                      <div
                        {...avatarImageGetRootProps()}
                        className={cn(
                          "group relative grid h-full w-full cursor-pointer place-items-center rounded-full border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          avatarImageIsDragActive &&
                            "border-muted-foreground/50",
                          disabled && "pointer-events-none opacity-60"
                        )}
                      >
                        <input {...avatarImageGetInputProps()} />
                        {isUploading ? (
                          <Icons.uploadCloud
                            className="h-9 w-9 animate-pulse text-muted-foreground"
                            aria-hidden="true"
                          />
                        ) : avatarImageIsDragActive ? (
                          <Icons.uploadCloud
                            className={cn(
                              "h-8 w-8",
                              avatarImageIsDragActive && "animate-bounce"
                            )}
                            aria-hidden="true"
                          />
                        ) : (
                          <Icons.uploadCloud
                            className="h-8 w-8 text-muted-foreground"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    ) : (
                      <AspectRatio
                        ratio={1 / 1}
                        className="h-full w-full overflow-hidden rounded-full"
                      >
                        <Image
                          src={avatar.preview || ""}
                          alt={avatar.name}
                          fill
                          className="object-cover"
                        />
                      </AspectRatio>
                    )}
                  </div>
                  {avatar && (
                    <div className="flex gap-2">
                      <CropImageDialog
                        file={avatar}
                        setFile={setAvatar}
                        aspectRatio={1 / 1}
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => field.onChange(undefined)}
                        type="button"
                      >
                        <Icons.trash className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="cover"
        render={({ field }) => (
          <FormItem>
            <div className="grid gap-2 lg:grid-cols-2">
              <div>
                <FormLabel>Store cover</FormLabel>
                <FormDescription>
                  Appears on receipts, invoices, and more
                </FormDescription>
              </div>
              <FormControl>
                <AspectRatio
                  ratio={4 / 1}
                  className="relative overflow-hidden rounded-lg"
                >
                  {!cover ? (
                    <div
                      {...coverImageGetRootProps()}
                      className={cn(
                        "group relative grid h-full w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        coverImageIsDragActive && "border-muted-foreground/50",
                        disabled && "pointer-events-none opacity-60"
                      )}
                    >
                      <input {...coverImageGetInputProps()} />
                      {isUploading ? (
                        <div className="group grid w-full place-items-center gap-1 sm:px-10">
                          <Icons.uploadCloud
                            className="h-9 w-9 animate-pulse text-muted-foreground"
                            aria-hidden="true"
                          />
                        </div>
                      ) : coverImageIsDragActive ? (
                        <div className="grid place-items-center gap-2 text-muted-foreground sm:px-5">
                          <Icons.uploadCloud
                            className={cn(
                              "h-8 w-8",
                              coverImageIsDragActive && "animate-bounce"
                            )}
                            aria-hidden="true"
                          />
                          <p className="text-base font-medium">
                            Drop the file here
                          </p>
                        </div>
                      ) : (
                        <div className="grid place-items-center gap-1 sm:px-5">
                          <Icons.uploadCloud
                            className="h-8 w-8 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <p className="mt-2 text-base font-medium text-muted-foreground">
                            Drop your image here, or{" "}
                            <span className="text-blue-500">
                              click to browse
                            </span>
                          </p>
                          <p className="text-sm text-slate-500">
                            1600 x 400 (4:1) recommended, up to{" "}
                            {formatBytes(STORE_COVER_IMAGE_FILE_MAX_SIZE_BYTES)}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Image
                        src={cover.preview || ""}
                        alt={cover.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {cover && (
                    <div className="absolute right-2 top-2 flex gap-2">
                      <CropImageDialog
                        file={cover}
                        setFile={setCover}
                        aspectRatio={5 / 1}
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        onClick={() => field.onChange(undefined)}
                      >
                        <Icons.trash className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </AspectRatio>
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
