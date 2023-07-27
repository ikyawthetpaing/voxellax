import * as React from "react";
import Image from "next/image";
import {
  useDropzone,
  type Accept,
  type FileRejection,
  type FileWithPath,
} from "react-dropzone";
import { cn, formatBytes } from "@/lib/utils";
import { AspectRatio } from "../ui/aspect-ratio";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { FileWithPreview } from "@/types";
import { toast } from "../ui/use-toast";
import { Icons } from "../icons";
import { Button } from "../ui/button";

interface ProductImageFileFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  accept?: Accept;
  maxSize?: number;
  maxFiles?: number;
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  setDeletedFiles?: React.Dispatch<React.SetStateAction<string[]>>;
  isUploading?: boolean;
  disabled?: boolean;
}

export function ProductImageFileForm({
  accept = {
    "image/*": [],
  },
  maxSize = 1024 * 1024 * 2,
  maxFiles = 1,
  files,
  setFiles,
  setDeletedFiles,
  isUploading = false,
  disabled = false,
  className,
  ...props
}: ProductImageFileFormProps) {
  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      // Truncate files array if it exceeds 12 files
      if (files.length >= maxFiles) {
        toast({
          description: `You can only upload up to ${maxFiles} file(s).`,
          variant: "destructive",
        });
        return;
      }

      // Calculate how many more files can be added
      const totalFilesCount = files.length;
      const remainingSlots = maxFiles - totalFilesCount;
      const filesToAdd = acceptedFiles
        .slice(0, remainingSlots)
        .map((file, index) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            index: totalFilesCount + index,
          })
        );

      setFiles((prevFiles) => [...prevFiles, ...filesToAdd]);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === "file-too-large") {
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
    [files.length, maxFiles, maxSize, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    disabled,
  });

  // Revoke preview url when component unmounts
  React.useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

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
            <p className="text-base font-medium">Drop the file here</p>
          </div>
        ) : (
          <div className="grid place-items-center gap-1 sm:px-5">
            <Icons.uploadCloud
              className="h-8 w-8 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="mt-2 text-base font-medium text-muted-foreground">
              Drop your images here, or{" "}
              <span className="text-blue-500">click to browse</span>
            </p>
            <p className="text-sm text-slate-500">
              1600 x 1200 (4:3) recommended, up to {formatBytes(maxSize)} each.
            </p>
          </div>
        )}
      </div>
      <p className="text-center text-sm font-medium text-muted-foreground">
        You can upload up to {maxFiles} {maxFiles === 1 ? "file" : "files"}
      </p>
      {files.length ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-product-images">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {files.map((file, index) => (
                  <Draggable
                    draggableId={file.preview}
                    index={index}
                    key={file.preview}
                    isDragDisabled={disabled}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <FileCard
                          key={file.preview}
                          i={index}
                          files={files}
                          setFiles={setFiles}
                          setDeletedFiles={setDeletedFiles}
                          file={file}
                          className={cn({
                            "border-y backdrop-blur-md bg-primary/5":
                              snapshot.isDragging,
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
      ) : null}
      {files.length ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2.5 w-full"
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

interface FileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  i: number;
  file: FileWithPreview;
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  setDeletedFiles?: React.Dispatch<React.SetStateAction<string[]>>;
}

function FileCard({
  i,
  file,
  files,
  setFiles,
  setDeletedFiles,
  className,
}: FileCardProps) {
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
          {i === 0 && (
            <div className="absolute right-0 top-0 flex h-6 w-6 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-blue-500">
              <Icons.star className="h-4 w-4" />
            </div>
          )}
        </AspectRatio>
      </div>
      <div className="flex flex-1 justify-between gap-4">
        <div>
          <p className="line-clamp-1 text-sm font-medium text-muted-foreground">
            {file.name}
          </p>
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
            <Icons.clear className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
