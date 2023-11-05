"use client";

import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { ProductImageWithPreview } from "@/types";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProps,
  DropResult,
} from "react-beautiful-dnd";
import {
  useDropzone,
  type Accept,
  type FileRejection,
  type FileWithPath,
} from "react-dropzone";
import { toast } from "sonner";

import { cn, formatBytes } from "@/lib/utils";
import { useMounted } from "@/hooks/mounted";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

interface ProductImageFileFormProps extends HTMLAttributes<HTMLDivElement> {
  accept?: Accept;
  maxSize: number;
  maxFiles: number;
  files: ProductImageWithPreview[];
  setFiles: Dispatch<SetStateAction<ProductImageWithPreview[]>>;
  isUploading?: boolean;
  disabled?: boolean;
}

export function ProductImageFileForm({
  accept = { "image/*": [] },
  maxSize,
  maxFiles,
  files,
  setFiles,
  isUploading = false,
  disabled = false,
  className,
  ...props
}: ProductImageFileFormProps) {
  const mounted = useMounted();

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      const totalFilesCount = files.length;

      if (files.length >= maxFiles) {
        toast(`You can only upload up to ${maxFiles} file(s).`);
        return;
      }
      const remainingSlots = maxFiles - totalFilesCount;
      const filesToAdd = acceptedFiles
        .slice(0, remainingSlots)
        .map((file, i) => {
          let preview = URL.createObjectURL(file);
          let index = totalFilesCount + i;
          let isThumbnail = index === 0;
          return Object.assign(file, {
            preview,
            index,
            isThumbnail,
          });
        });
      setFiles((prevFiles) => [...prevFiles, ...filesToAdd]);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === "file-too-large" && maxSize) {
            toast(`File is too large. Max size is ${formatBytes(maxSize)}`);
            return;
          }
          errors[0]?.message && toast(errors[0].message);
        });
      }
    },
    [files, maxFiles, maxSize, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    disabled,
  });

  useEffect(() => {
    if (mounted()) {
      setFiles((oldFiles) => {
        const newFiles: ProductImageWithPreview[] = [];

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
        files.forEach(
          (file) => file.preview && URL.revokeObjectURL(file.preview)
        );
      };
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

    newFiles.map((image, index) => {
      image.index = index;
    });

    setFiles(newFiles);
  }

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
            <p className="text-base font-medium">Drop the image(s) here</p>
          </div>
        ) : (
          <div className="grid place-items-center gap-1 sm:px-5">
            <Icons.uploadCloud
              className="h-8 w-8 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="mt-2 text-base font-medium text-muted-foreground">
              Drop your image(s) here, or{" "}
              <span className="text-blue-500">click to browse</span>
            </p>
            <p className="text-sm text-slate-500">
              1600 x 1200 (4:3) recommended, up to {formatBytes(maxSize)} each.
            </p>
          </div>
        )}
      </div>
      {files.length ? (
        <div className="grid gap-2">
          <h1>Uploads: </h1>
          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="product-images-droppable">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-full overflow-hidden"
                >
                  {files.map((file, index) => (
                    <Draggable
                      index={index}
                      draggableId={`${file.name}-${index}`}
                      key={`${file.name}-${index}`}
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
                            file={file}
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
            </StrictModeDroppable>
          </DragDropContext>
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
  file: ProductImageWithPreview;
  files: ProductImageWithPreview[];
  setFiles: Dispatch<SetStateAction<ProductImageWithPreview[]>>;
}

function FileCard({ i, file, files, setFiles, className }: FileCardProps) {
  return (
    <div className={cn("flex gap-4 py-2", className)}>
      <div className="w-24">
        <AspectRatio ratio={4 / 3} className="relative">
          <Image
            src={file.preview}
            alt={file.name}
            fill
            className="rounded-lg object-cover"
          />
          {file.isThumbnail && (
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline" className="h-7 w-7 p-0">
              <Icons.moreHorizontal className="h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {!file.isThumbnail && (
              <DropdownMenuItem
                onClick={() => {
                  const newFiles = files.map((file) =>
                    Object.assign(file, {
                      preview: file.preview,
                      index: file.index,
                      isThumbnail: false,
                    })
                  );
                  newFiles[i].isThumbnail = true;
                  setFiles(newFiles);
                }}
              >
                Set as thumbnail
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => {
                const newFiles = files.filter((_, j) => j !== i);

                if (file.isThumbnail && newFiles.length > 0) {
                  newFiles[0].isThumbnail = true;
                }

                // Update the index property for each image in the newFiles array
                newFiles.map((image, index) => {
                  image.index = index;
                });
                setFiles(newFiles);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function StrictModeDroppable({ children, ...props }: DroppableProps) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
}
