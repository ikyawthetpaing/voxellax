"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ProductFileWithPath,
  ProductImageUploadedFile,
  ProductImageWithPreview,
  UploadedFile,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Product } from "@/db/schema";

import { updateProduct } from "@/lib/actions/product";
import { catchError, cn } from "@/lib/utils";
import {
  ProductSchema,
  productSchema,
  UpdateProductSchema,
} from "@/lib/validations/product";
import { useUploadThing } from "@/hooks/uploadthing";
import { buttonVariants } from "@/components/ui/button";
import { ProductForm } from "@/components/forms/product-form";
import { Icons } from "@/components/icons";

interface Props {
  product: Product;
}

export function UpdateProductForm({ product }: Props) {
  const submitId = "update-product-form-submit";
  const [imageFiles, setImageFiles] = useState<ProductImageWithPreview[]>([]);
  const [digitalFiles, setDigitalFiles] = useState<ProductFileWithPath[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
        const fileContent = new Blob([], { type: "image/*" });

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
        const fileContent = new Blob([], { type: "image/*" });

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

  const { startUpload: startProductImageUpload } = useUploadThing(
    "productImageUploader"
  );
  const { startUpload: startProductFileUpload } = useUploadThing(
    "productFileUploader"
  );

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

        await updateProduct(updateData, product.id);
        router.refresh();

        toast.success("Product updated sucessfully.");
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <div>
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
      <div className="grid grid-cols-2 gap-6">
        <Link
          href="/dashboard/store/products"
          className={buttonVariants({ variant: "outline" })}
        >
          Cancel
        </Link>
        <label
          htmlFor={submitId}
          className={cn(buttonVariants(), "cursor-pointer", {
            "pointer-events-none cursor-not-allowed opacity-50": isPending,
          })}
        >
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </label>
      </div>
    </div>
  );
}
