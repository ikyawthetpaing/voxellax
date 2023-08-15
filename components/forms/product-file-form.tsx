import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import Image from "next/image";
import { FileWithPreview } from "@/types";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import {
  useDropzone,
  type Accept,
  type FileRejection,
  type FileWithPath,
} from "react-dropzone";

import { cn, formatBytes, isImage } from "@/lib/utils";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

type UploadFor = "product-image-file" | "product-digital-file";

interface ProductFileFormProps extends HTMLAttributes<HTMLDivElement> {
  accept?: Accept;
  totalSize?: number;
  maxSize?: number;
  maxFiles?: number;
  files: FileWithPreview[];
  setFiles: Dispatch<SetStateAction<FileWithPreview[]>>;
  setDeletedFiles?: Dispatch<SetStateAction<string[]>>;
  isUploading?: boolean;
  disabled?: boolean;
  uploadFor: UploadFor;
}

export function ProductFileForm({
  accept,
  totalSize,
  maxSize,
  maxFiles,
  files,
  setFiles,
  setDeletedFiles,
  isUploading = false,
  disabled = false,
  uploadFor,
  className,
  ...props
}: ProductFileFormProps) {
  if (totalSize && maxSize) {
    throw new Error(
      "ProductFileForm: can't use totalSize and maxSize at the same time."
    );
  }
  if (!totalSize && !maxSize) {
    throw new Error(
      "ProductFileForm: must assign one value totalSize or maxSize."
    );
  }

  const isMounted = useIsMounted();

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      const totalFilesCount = files.length;

      if (maxFiles && uploadFor === "product-image-file") {
        if (files.length >= maxFiles) {
          toast({
            description: `You can only upload up to ${maxFiles} file(s).`,
            variant: "destructive",
          });
          return;
        }
        const remainingSlots = maxFiles - totalFilesCount;
        const filesToAdd = acceptedFiles
          .slice(0, remainingSlots)
          .map((file, i) => {
            let preview = undefined;
            let index = totalFilesCount + i;
            if (isImage(file.type) && uploadFor === "product-image-file") {
              preview = URL.createObjectURL(file);
            }
            return Object.assign(file, {
              preview,
              index,
            });
          });
        setFiles((prevFiles) => [...prevFiles, ...filesToAdd]);
      }

      if (totalSize && uploadFor === "product-digital-file") {
        let addedFilesSize = 0;

        files.map((file) => (addedFilesSize += file.size));
        acceptedFiles.map((file) => (addedFilesSize += file.size));

        if (addedFilesSize > totalSize) {
          toast({ description: `${formatBytes(totalSize)} limit.` });
        } else {
          const filesToAdd = acceptedFiles.map((file, i) => {
            return Object.assign(file, {
              index: totalFilesCount + i,
            });
          });

          setFiles((prevFiles) => [...prevFiles, ...filesToAdd]);
        }
      }

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === "file-too-large" && maxSize) {
            toast({
              description: `File is too large. Max size is ${formatBytes(
                maxSize
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
    [files, maxFiles, maxSize, setFiles, totalSize, uploadFor]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: true,
    disabled,
  });

  useEffect(() => {
    if (uploadFor === "product-image-file") {
      if (isMounted()) {
        setFiles((oldFiles) => {
          const newFiles: FileWithPreview[] = [];

          oldFiles.map((file) => {
            newFiles.push(
              Object.assign(file, {
                preview: URL.createObjectURL(file),
                index: file.index,
              })
            );
          });
          return newFiles;
        });
      } else {
        return () => {
          files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    const newFiles = Array.from(files);
    const [removed] = newFiles.splice(result.source.index, 1);
    newFiles.splice(result.destination.index, 0, removed);

    // Update the index property for each image in the newFiles array
    newFiles.map((image, index) => {
      image.index = index;
    });

    setFiles(newFiles);
  }

  return (
    <div className="grid gap-2">
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
            <p className="text-base font-medium">
              Drop the{" "}
              {uploadFor === "product-image-file" ? "image(s)" : "file(s)"} here
            </p>
          </div>
        ) : (
          <div className="grid place-items-center gap-1 sm:px-5">
            <Icons.uploadCloud
              className="h-8 w-8 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="mt-2 text-base font-medium text-muted-foreground">
              Drop your{" "}
              {uploadFor === "product-image-file" ? "image(s)" : "file(s)"}{" "}
              here, or <span className="text-blue-500">click to browse</span>
            </p>
            <p className="text-sm text-slate-500">
              {uploadFor === "product-image-file"
                ? "1600 x 1200 (4:3) recommended,"
                : "Unlimited files,"}{" "}
              {maxSize && `up to ${formatBytes(maxSize)} each.`}
              {totalSize && `${formatBytes(totalSize)} total limit.`}
            </p>
          </div>
        )}
      </div>
      {files.length ? (
        <>
          <h1>Uploads: </h1>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={uploadFor}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-full overflow-hidden"
                >
                  {files.map((file, index) => (
                    <Draggable
                      index={index}
                      draggableId={file.name + index}
                      key={file.name + index}
                      isDragDisabled={disabled}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <FileCard
                            i={index}
                            files={files}
                            setFiles={setFiles}
                            setDeletedFiles={setDeletedFiles}
                            file={file}
                            uploadFor={uploadFor}
                            className={cn({
                              "border-y bg-background": snapshot.isDragging,
                            })}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      ) : null}
      {files.length ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            const uploadedFiles = files.filter((file) => file.uploaded);
            uploadedFiles.map((file) => {
              if (file.uploaded && setDeletedFiles) {
                setDeletedFiles((prev) => [
                  ...prev,
                  file.uploaded!.uploadthingKey,
                ]);
              }
            });
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
  file: FileWithPreview;
  files: FileWithPreview[];
  setFiles: Dispatch<SetStateAction<FileWithPreview[]>>;
  setDeletedFiles?: Dispatch<SetStateAction<string[]>>;
  uploadFor: UploadFor;
}

function FileCard({
  i,
  file,
  files,
  setFiles,
  setDeletedFiles,
  uploadFor,
  className,
}: FileCardProps) {
  const fileExtension = file.type.split("/").pop();
  return (
    <div className={cn("flex gap-4 py-2", className)}>
      <div className="w-24">
        <AspectRatio ratio={4 / 3} className="relative">
          {uploadFor === "product-image-file" && file.preview ? (
            <Image
              src={file.preview}
              alt={file.name}
              fill
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-accent text-xl font-medium uppercase text-accent-foreground">
              {fileExtension ? fileExtension : "None"}
            </div>
          )}
          {i === 0 && uploadFor === "product-image-file" && (
            <div className="absolute right-0 top-0 flex h-6 w-6 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-blue-500">
              <Icons.star className="h-4 w-4" />
            </div>
          )}
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
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => {
            if (!files) return;
            if (file.uploaded && setDeletedFiles) {
              setDeletedFiles((prev) => [
                ...prev,
                file.uploaded!.uploadthingKey,
              ]);
            }
            const newFiles = files.filter((_, j) => j !== i);

            // Update the index property for each image in the newFiles array
            newFiles.map((image, index) => {
              image.index = index;
            });
            setFiles(newFiles);
          }}
        >
          <Icons.x className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    </div>
  );
}
