"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/db/schema";
import {
  ProductFileWithPath,
  ProductImageUploadedFile,
  ProductImageWithPreview,
  UploadedFile,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { updateProductAction } from "@/lib/actions/product";
import { cn } from "@/lib/utils";
import {
  ProductSchema,
  productSchema,
  UpdateProductSchema,
} from "@/lib/validations/product";
import { useUploadThing } from "@/hooks/use-uploadthing";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import { ProductForm } from "@/components/forms/product-form";
import { Icons } from "@/components/icons";

interface UpdateProductFormSheetProps {
  product: Product;
  trigger?: JSX.Element;
}

export function UpdateProductFormSheet({
  product,
  trigger,
}: UpdateProductFormSheetProps) {
  const submitId = "update-product-form-submit";
  const [isOpen, setIsOpen] = useState(true);
  const [imageFiles, setImageFiles] = useState<ProductImageWithPreview[]>([]);
  const [digitalFiles, setDigitalFiles] = useState<ProductFileWithPath[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description!,
      price: product.price.toString(),
      category: product.category,
      subcategory: product.subcategory!,
    },
  });

  useEffect(() => {
    if (product.images) {
      const uploadedImages: ProductImageWithPreview[] = [];
      product.images.map((image) => {
        const fileContent = new Blob([], { type: "image/*" }); // <- empty blob file

        const fileWithPreview: ProductImageWithPreview = Object.assign(
          new File([fileContent], image.name, {
            type: "image",
            lastModified: 0,
          }),
          {
            preview: image.url,
            index: image.index,
            isThumbnail: image.isThumbnail,
            uploaded: {
              key: image.key,
              size: image.size,
              name: image.name,
              url: image.url,
            },
          }
        );

        uploadedImages.push(fileWithPreview);
      });
      setImageFiles(uploadedImages);
    }
    if (product.files) {
      const uploadedFiles: ProductFileWithPath[] = [];
      product.files.map((image) => {
        const fileContent = new Blob([], { type: "image/*" }); // <- empty blob file

        const fileWithPreview: ProductFileWithPath = Object.assign(
          new File([fileContent], image.name, {
            type: "image",
            lastModified: 0,
          }),
          {
            uploaded: {
              key: image.key,
              size: image.size,
              name: image.name,
              url: image.url,
            },
          }
        );

        uploadedFiles.push(fileWithPreview);
      });
      setDigitalFiles(uploadedFiles);
    }
  }, [product.files, product.images]);

  useEffect(() => {
    if (!isOpen) {
      // now you got a read/write object
      const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

      current.delete("edit");

      // cast to string
      const search = current.toString();
      // or const query = `${'?'.repeat(search.length && 1)}${search}`;
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`);
    }
  }, [isOpen, pathname, router, searchParams]);

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
        const newImageFiles = imageFiles.filter(
          (file) => file.path !== undefined
        );
        const newDigitalFiles = digitalFiles.filter(
          (file) => file.path !== undefined
        );

        const images: ProductImageUploadedFile[] = [];
        const files: UploadedFile[] = [];

        imageFiles.map((file) => {
          if (file.uploaded) {
            images.push({
              ...file.uploaded,
              isThumbnail: file.isThumbnail,
              index: file.index,
            });
          }
        });
        digitalFiles.map((file) => {
          if (file.uploaded) {
            files.push(file.uploaded);
          }
        });

        await Promise.all(
          newImageFiles.map(async (file) => {
            const res = await startProductImageUpload([file]);
            if (res) {
              images.push({
                ...res[0],
                index: file.index,
                isThumbnail: file.isThumbnail,
              });
            }
          })
        );

        if (newDigitalFiles.length > 0) {
          const res = await startProductFileUpload(newDigitalFiles);
          if (res) {
            res.map((ufile) => files.push(ufile));
          }
        }

        const updateData: UpdateProductSchema = {
          ...data,
          images,
          files,
        };

        await updateProductAction(updateData, product.id);
        setIsOpen(false);
        router.refresh();
        toast({ description: "Product updated sucessfully." });
      } catch (error) {
        console.error(error);
        toast({
          title: "Product was not updated.",
          description: "Something went wrong, please try again",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(true)}>
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
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            digitalFiles={digitalFiles}
            setDigitalFiles={setDigitalFiles}
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
            Save Changes
          </label>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
