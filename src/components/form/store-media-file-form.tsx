"use client";

import { cn, formatBytes } from "@/lib/utils";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { toast } from "../ui/use-toast";
import { FileWithPreview } from "@/types";
import { STORE_COVER_IMAGE_FILE_MAX_SIZE_BYTES } from "@/constants/store";
import { Icons } from "../icons";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";

interface StoreMediaFileFormProps {
  disabled: boolean;
  isUploading: boolean;
  profileImage: FileWithPreview | null;
  setProfileImage: React.Dispatch<React.SetStateAction<FileWithPreview | null>>;
  coverImage: FileWithPreview | null;
  setCoverImage: React.Dispatch<React.SetStateAction<FileWithPreview | null>>;
}

export function StoreMediaFileForm({
  disabled,
  isUploading,
  profileImage,
  setProfileImage,
  coverImage,
  setCoverImage,
}: StoreMediaFileFormProps) {
  const profileImageOnDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      const addedFile = acceptedFiles[0];
      const newFile = Object.assign(addedFile, {
        preview: URL.createObjectURL(addedFile),
      }) as FileWithPreview;
      setProfileImage(newFile);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === "file-too-large") {
            toast({
              description: `File is too large. Max size is ${formatBytes(
                STORE_COVER_IMAGE_FILE_MAX_SIZE_BYTES
              )}`,
              variant: "destructive",
            });
            return;
          }
          errors[0]?.message &&
            toast({ description: errors[0].message, variant: "destructive" });
        });
      }
    },
    [setProfileImage]
  );

  const {
    getRootProps: profileImageGetRootProps,
    getInputProps: profileImageGetInputProps,
    isDragActive: profileImageIsDragActive,
  } = useDropzone({
    onDrop: profileImageOnDrop,
    accept: {
      "image/*": [],
    },
    maxSize: STORE_COVER_IMAGE_FILE_MAX_SIZE_BYTES,
    maxFiles: 1,
    multiple: false,
    disabled: disabled,
  });

  const coverImageOnDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      const addedFile = acceptedFiles[0];
      const newFile = Object.assign(addedFile, {
        preview: URL.createObjectURL(addedFile),
      }) as FileWithPreview;
      setCoverImage(newFile);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === "file-too-large") {
            toast({
              description: `File is too large. Max size is ${formatBytes(
                STORE_COVER_IMAGE_FILE_MAX_SIZE_BYTES
              )}`,
              variant: "destructive",
            });
            return;
          }
          errors[0]?.message &&
            toast({ description: errors[0].message, variant: "destructive" });
        });
      }
    },
    [setCoverImage]
  );

  const {
    getRootProps: coverImageGetRootProps,
    getInputProps: coverImageGetInputProps,
    isDragActive: coverImageIsDragActive,
  } = useDropzone({
    onDrop: coverImageOnDrop,
    accept: {
      "image/*": [],
    },
    maxSize: STORE_COVER_IMAGE_FILE_MAX_SIZE_BYTES,
    maxFiles: 1,
    multiple: false,
    disabled: disabled,
  });

  return (
    <>
      <FormItem>
        <FormLabel>Profile</FormLabel>
        <FormControl>
          <div className="flex items-center gap-4">
            <div className="h-24 w-24">
              {!profileImage ? (
                <div
                  {...profileImageGetRootProps()}
                  className={cn(
                    "group relative grid h-full w-full cursor-pointer place-items-center rounded-full border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                    "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    profileImageIsDragActive && "border-muted-foreground/50",
                    disabled && "pointer-events-none opacity-60"
                  )}
                >
                  <input {...profileImageGetInputProps()} />
                  {isUploading ? (
                    <Icons.uploadCloud
                      className="h-9 w-9 animate-pulse text-muted-foreground"
                      aria-hidden="true"
                    />
                  ) : profileImageIsDragActive ? (
                    <Icons.uploadCloud
                      className={cn(
                        "h-8 w-8",
                        profileImageIsDragActive && "animate-bounce"
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
                    src={profileImage.preview}
                    alt={profileImage.name}
                    fill
                    className="object-cover"
                  />
                </AspectRatio>
              )}
            </div>
            {profileImage && (
              <div className="flex gap-2">
                <Button size="icon" variant="outline">
                  <Icons.crop className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setProfileImage(null);
                  }}
                >
                  <Icons.trash className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </FormControl>
      </FormItem>
      <FormItem>
        <FormLabel>Cover</FormLabel>
        <FormControl>
          <AspectRatio
            ratio={4 / 1}
            className="relative overflow-hidden rounded-lg"
          >
            {!coverImage ? (
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
                    <p className="text-base font-medium">Drop the file here</p>
                  </div>
                ) : (
                  <div className="grid place-items-center gap-1 sm:px-5">
                    <Icons.uploadCloud
                      className="h-8 w-8 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <p className="mt-2 text-base font-medium text-muted-foreground">
                      Drop your image here, or{" "}
                      <span className="text-blue-500">click to browse</span>
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
                  src={coverImage.preview}
                  alt={coverImage.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {coverImage && (
              <div className="absolute right-2 top-2 flex gap-2">
                <Button size="icon" variant="secondary">
                  <Icons.crop className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => {
                    setCoverImage(null);
                  }}
                >
                  <Icons.trash className="h-4 w-4" />
                </Button>
              </div>
            )}
          </AspectRatio>
        </FormControl>
      </FormItem>
    </>
  );
}
