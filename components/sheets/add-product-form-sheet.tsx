"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ProductFileWithPath, ProductImageWithPreview } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { PRODUCT_DEFAULT_PRICE } from "@/constants/product";

import { addProduct } from "@/lib/actions/product";
import { catchError, cn } from "@/lib/utils";
import {
  AddProductSchema,
  ProductSchema,
  productSchema,
} from "@/lib/validations/product";
import { useUploadThing } from "@/hooks/uploadthing";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductForm } from "@/components/forms/product-form";
import { Icons } from "@/components/icons";

interface AddProductFormSheetProps {
  storeId: string;
  trigger: JSX.Element;
}

export function AddProductFormSheet({
  storeId,
  trigger,
}: AddProductFormSheetProps) {
  const submitId = "add-product-form-submit";
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<ProductImageWithPreview[]>([]);
  const [files, setFiles] = useState<ProductFileWithPath[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      price: PRODUCT_DEFAULT_PRICE.toString(),
    },
  });

  const { startUpload: startProductImageUpload } = useUploadThing(
    "productImageUploader"
  );
  const { startUpload: startProductFileUpload } = useUploadThing(
    "productFileUploader"
  );

  function handleCancel() {
    setIsOpen(false);
  }

  function onSubmit(data: ProductSchema) {
    startTransition(async () => {
      try {
        const addData: AddProductSchema = {
          ...data,
          images: [],
          files: [],
        };

        await Promise.all(
          images.map(async (file) => {
            const res = await startProductImageUpload([file]);
            if (res) {
              addData.images.push({
                ...res[0],
                index: file.index,
                isThumbnail: file.isThumbnail,
              });
            }
          })
        );

        if (files) {
          const res = await startProductFileUpload(files);
          if (res) {
            addData.files = res;
          }
        }

        await addProduct(addData, storeId);

        form.reset();
        setImages([]);
        setFiles([]);
        setIsOpen(false);
        router.refresh();

        toast.success("Product added successfully.");
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        className="flex w-full flex-col gap-0 p-0 sm:max-w-lg"
        showCloseButton={false}
      >
        <SheetHeader className="border-b p-6">
          <SheetTitle>Create Product</SheetTitle>
        </SheetHeader>

        <div className="hide-scrollbar flex-1 overflow-y-auto p-6">
          <ProductForm
            submitId={submitId}
            form={form}
            onSubmit={onSubmit}
            imageFiles={images}
            setImageFiles={setImages}
            digitalFiles={files}
            setDigitalFiles={setFiles}
            disabled={isPending}
          />
        </div>
        <SheetFooter className="bottom-0 grid w-full grid-cols-2 gap-4 border-t p-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <label
            htmlFor={submitId}
            className={cn(buttonVariants(), {
              "pointer-events-none opacity-50": isPending,
            })}
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Publish
          </label>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
