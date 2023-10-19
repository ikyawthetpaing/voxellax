"use client";

import { Dispatch, HTMLAttributes, SetStateAction, useCallback } from "react";
import { ProductFileWithPath } from "@/types";
import {
  useDropzone,
  type FileRejection,
  type FileWithPath,
} from "react-dropzone";
import { toast } from "sonner";

import { cn, formatBytes } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface ProductFileFormProps extends HTMLAttributes<HTMLDivElement> {
  totalSize: number;
  maxFiles: number;
  files: ProductFileWithPath[];
  setFiles: Dispatch<SetStateAction<ProductFileWithPath[]>>;
  isUploading?: boolean;
  disabled?: boolean;
}

export function ProductFileForm({
  totalSize,
  maxFiles,
  files,
  setFiles,
  isUploading = false,
  disabled = false,
  className,
  ...props
}: ProductFileFormProps) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      let addedFilesSize = 0;

      files.map((file) => (addedFilesSize += file.size));
      acceptedFiles.map((file) => (addedFilesSize += file.size));

      if (addedFilesSize > totalSize) {
        toast(`Total limit is${formatBytes(totalSize)}.`);
      } else {
        const filesToAdd = acceptedFiles.map((file, i) => {
          return Object.assign(file);
        });

        setFiles((prevFiles) => [...prevFiles, ...filesToAdd]);
      }

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          errors[0]?.message && toast(errors[0].message);
        });
      }
    },
    [files, setFiles, totalSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    multiple: maxFiles > 1,
    disabled,
    accept: { "application/zip": [] },
  });

  return (
    <div className="grid gap-4">
      <div
        {...getRootProps()}
        className={cn(
          "group relative grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isDragActive && "border-muted-foreground/50",
          disabled && "pointer-events-none opacity-60",
          className
        )}
        {...props}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="group grid w-full place-items-center gap-1 sm:px-10">
            <Icons.uploadCloud
              className="h-9 w-9 animate-pulse text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        ) : isDragActive ? (
          <div className="grid place-items-center gap-2 text-muted-foreground sm:px-5">
            <Icons.uploadCloud
              className={cn("h-8 w-8", isDragActive && "animate-bounce")}
              aria-hidden="true"
            />
            <p className="text-base font-medium">Drop the file(s) here</p>
          </div>
        ) : (
          <div className="grid place-items-center gap-1 sm:px-5">
            <Icons.uploadCloud
              className="h-8 w-8 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="mt-2 text-base font-medium text-muted-foreground">
              Drop your zip file(s) here, or{" "}
              <span className="text-blue-500">click to browse</span>
            </p>
            <p className="text-sm text-slate-500">
              Unlimited files, {formatBytes(totalSize)} total limit.
            </p>
          </div>
        )}
      </div>
      {files.length ? (
        <div className="grid gap-2">
          <h1>Uploads: </h1>
          <div className="w-full overflow-hidden">
            {files.map((file, index) => (
              <FileCard
                i={index}
                files={files}
                setFiles={setFiles}
                file={file}
              />
            ))}
          </div>
        </div>
      ) : null}
      {files.length ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            setFiles([]);
          }}
        >
          <Icons.trash className="mr-2 h-4 w-4" aria-hidden="true" />
          Remove All
          <span className="sr-only">Remove All</span>
        </Button>
      ) : null}
    </div>
  );
}

interface FileCardProps extends HTMLAttributes<HTMLDivElement> {
  i: number;
  file: ProductFileWithPath;
  files: ProductFileWithPath[];
  setFiles: Dispatch<SetStateAction<ProductFileWithPath[]>>;
}

function FileCard({ i, file, files, setFiles, className }: FileCardProps) {
  const matchResult = file.name.match(/\.([^.]+)$/);
  const extension = matchResult ? matchResult[1] : "Unknown";

  return (
    <div className={cn("flex gap-4 py-2", className)}>
      <div className="w-24">
        <AspectRatio ratio={4 / 3} className="relative">
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-accent text-lg font-medium uppercase text-accent-foreground">
            {extension}
          </div>
        </AspectRatio>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <h1 className="line-clamp-1 text-sm font-medium text-muted-foreground">
          {file.name}
        </h1>
        <p className="text-xs text-slate-500">
          {formatBytes(file.uploaded?.size || file.size, 1)}
        </p>
      </div>
      <div>
        <Button
          type="button"
          variant="outline"
          className="h-7 w-7 p-0"
          onClick={() => {
            const newFiles = files.filter((_, j) => j !== i);
            setFiles(newFiles);
          }}
        >
          {file.uploaded ? (
            <Icons.trash className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Icons.x className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    </div>
  );
}
