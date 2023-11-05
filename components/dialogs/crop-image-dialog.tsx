import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FileWithPreview } from "@/types";
import Cropper, { type ReactCropperElement } from "react-cropper";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Icons } from "@/components/icons";

interface CropImageDialogProps {
  file: FileWithPreview;
  setFile: Dispatch<SetStateAction<FileWithPreview | null>>;
  aspectRatio: number;
}

export function CropImageDialog({
  file,
  setFile,
  aspectRatio,
}: CropImageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cropperRef = useRef<ReactCropperElement>(null);

  const onCrop = useCallback(() => {
    if (!cropperRef.current) return;

    const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas();

    croppedCanvas.toBlob((blob) => {
      if (!blob) {
        console.error("Blob creation failed");
        return;
      }
      const croppedImage = new File([blob], file.name, {
        type: file.type,
        lastModified: Date.now(),
      });

      const croppedFileWithPathAndPreview = Object.assign(croppedImage, {
        preview: URL.createObjectURL(croppedImage),
        path: file.name,
      }) satisfies FileWithPreview;

      setFile(croppedFileWithPathAndPreview);
    });
  }, [file, setFile]);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        onCrop();
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [onCrop]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary" type="button">
          <Icons.crop className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Crop image</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <p className="absolute left-5 top-4 text-base font-medium text-muted-foreground">
          Crop image
        </p>
        <div className="mt-8 grid place-items-center space-y-5">
          <Cropper
            ref={cropperRef}
            className="h-[450px] w-[450px] object-cover"
            zoomTo={0.5}
            initialAspectRatio={1 / 1}
            preview=".img-preview"
            src={file.preview}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            guides={true}
          />
          <div className="flex items-center justify-center space-x-2">
            <Button
              aria-label="Crop image"
              type="button"
              size="sm"
              className="h-8"
              onClick={() => {
                onCrop();
                setIsOpen(false);
              }}
            >
              <Icons.crop className="mr-2 h-4 w-4" aria-hidden="true" />
              Crop image
            </Button>
            <Button
              aria-label="Reset crop"
              type="button"
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => {
                cropperRef.current?.cropper.reset();
              }}
            >
              <Icons.undo className="mr-2 h-4 w-4" aria-hidden="true" />
              Reset crop
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
