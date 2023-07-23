"use client";

import type {
  FileWithPreview,
  ProductLicenseSchema,
  ProductImagesPatchSchema,
  ProductPatchSchema,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { productFormSchema } from "@/lib/validations/product";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { LoadingButton } from "../loading-button";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getCategories, getSubcategories } from "@/config/category";
import { licenses as licenseTypes } from "@/config/license";
import { useEffect, useState } from "react";
import { isArrayOfFile } from "@/lib/utils";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { File as dbFile, License, Product } from "@prisma/client";
import { ProductImageFileForm } from "./product-image-file-form";
import {
  PRODUCT_DEFAULT_PRICE,
  PRODUCT_IMAGE_FILE_MAX_COUNT,
  PRODUCT_IMAGE_FILE_MAX_SIZE_BYTES,
} from "@/constants/product";

interface UpdateProductFormProps {
  storeId: string;
  product: Product;
  licenses: License[];
  images: dbFile[];
}

type Inputs = z.infer<typeof productFormSchema>;

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export function UpdateProductForm({
  storeId,
  product,
  licenses,
  images,
}: UpdateProductFormProps) {
  const parsedLicenses: ProductLicenseSchema[] = licenses.map((license) => {
    return {
      type: license.type,
      price: license.price.toString(),
    };
  });

  // react state
  const [imagesWithPreview, setImagesWithPreview] = useState<FileWithPreview[]>(
    []
  );
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [licensesState, setLicensesState] =
    useState<ProductLicenseSchema[]>(parsedLicenses);
  const [totalLicenses, setTotalLicenses] = useState(licenses.length);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesUploadProgress, setImagesUploadProgress] = useState(0);
  const router = useRouter();

  // Set files from product
  useEffect(() => {
    if (images && images.length > 0) {
      setImagesWithPreview(
        images.map((image) => {
          const file = new File([], image.name, {
            type: "image",
            lastModified: image.updatedAt.getSeconds(),
          });
          const fileWithPreview: FileWithPreview = Object.assign(file, {
            preview: image.url,
            index: image.index,
            uploaded: {
              uploadthingKey: image.key,
              size: image.size,
            },
          });

          return fileWithPreview;
        })
      );
    }
  }, [images]);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      category: product.category,
      subcategory: product.subcategory ?? undefined,
      licenses: parsedLicenses,
    },
  });

  const { isUploading: isImagesUploading, startUpload: startImagesUpload } =
    useUploadThing("productImage", {
      onUploadError: (error: Error) => {
        toast({
          title: "Uploadthing Error",
          description: `Error: ${error.message}`,
          variant: "destructive",
        });
      },
      onUploadProgress: (progress: number) => {
        setImagesUploadProgress(progress);
      },
    });

  useEffect(() => {
    form.setValue("licenses", licensesState);
    console.log("licenses run");
  }, [form, licenses, licensesState]);

  // Get subcategories based on category
  const subcategories = getSubcategories(form.watch("category"));
  const categories = getCategories();

  async function onSubmit(data: Inputs) {
    setIsLoading(true);
    try {
      const patchImages: ProductImagesPatchSchema = {
        deleted: [],
        added: [],
        updated: [],
      };

      // Assign delete images
      Array.from(deletedImages).forEach((key) => {
        patchImages.deleted.push({
          key: key,
        });
      });

      // Assing updated images index
      Array.from(imagesWithPreview).forEach((image) => {
        if (image.uploaded) {
          patchImages.updated.push({
            key: image.uploaded.uploadthingKey,
            index: image.index ?? 0,
          });
        }
      });

      // Upload add files and assign
      const newAddedFiles = imagesWithPreview.filter(
        (image) => !image.uploaded
      );

      if (isArrayOfFile(newAddedFiles)) {
        await Promise.all(
          newAddedFiles.map(async (newAddedFile) => {
            const res = await startImagesUpload([newAddedFile]);
            res?.forEach(({ fileKey }) =>
              patchImages.added.push({
                key: fileKey,
                index: newAddedFile.index ?? Number.MAX_SAFE_INTEGER,
              })
            );
          })
        );
      }

      const postData: ProductPatchSchema = {
        name: data.name,
        category: data.category,
        licenses: data.licenses,
        description: data.description,
        subcategory: data.subcategory,
        images: patchImages,
      };

      await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      form.reset();
      router.push(`/dashboard/stores/${storeId}/products`);
      router.refresh();
      toast({
        description: "Your product updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Your product was not updated.",
        description: `${error}`,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              aria-invalid={!!form.formState.errors.name}
              placeholder="Type product name here."
              {...form.register("name")}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.name?.message}
          />
        </FormItem>
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Type product description here."
              // className="hide-scrollbar"
              {...form.register("description")}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.description?.message?.toString()}
          />
        </FormItem>
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map(({ label, value }) => (
                          <SelectItem
                            key={value}
                            value={value}
                            className="capitalize"
                          >
                            {label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Subcategory</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {subcategories.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="licenses"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>License</FormLabel>
                <div className="grid gap-2">
                  {Array.from({ length: totalLicenses }, (_, index) => (
                    <div key={index} className="grid grid-cols-2 gap-6">
                      <FormControl className="w-1/2 flex-1">
                        <Select
                          value={licensesState[index]?.type}
                          onValueChange={(e) => {
                            const newLicenses = [...licensesState];
                            newLicenses[index] = { type: e };

                            setLicensesState(newLicenses);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a license" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {licenseTypes.map((license) => (
                                <SelectItem
                                  key={license.type}
                                  value={license.type}
                                  disabled={
                                    licensesState.find(
                                      (_license) =>
                                        _license?.type === license.type
                                    ) !== undefined
                                  }
                                >
                                  {license.type}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <div className="flex gap-6">
                        <div className="flex-1">
                          <Input
                            type="number"
                            onChange={(e) => {
                              const newLicensesState = [...licensesState];
                              newLicensesState[index] = {
                                ...newLicensesState[index],
                                price: e.target.value,
                              };
                              setLicensesState(newLicensesState);
                            }}
                            disabled={licensesState[index]?.type === undefined}
                            placeholder="Type license price here..."
                            value={
                              licensesState[index]?.price ??
                              PRODUCT_DEFAULT_PRICE
                            }
                          />
                          <UncontrolledFormMessage
                            message={
                              form.formState.errors.licenses &&
                              form.formState.errors.licenses[index]?.price
                                ?.message
                            }
                          />
                        </div>
                        <Button
                          type="button"
                          className="px-3"
                          variant="outline"
                          onClick={() => {
                            const newLicensesState = [...licensesState];
                            newLicensesState.splice(index, 1);
                            setLicensesState(newLicensesState);
                            setTotalLicenses(totalLicenses - 1);
                          }}
                        >
                          <Icons.trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {totalLicenses < licenseTypes.length && (
                    <Button
                      type="button"
                      onClick={() => setTotalLicenses(totalLicenses + 1)}
                      variant="outline"
                    >
                      <Icons.plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Images</FormLabel>
          <FormControl>
            <ProductImageFileForm
              maxFiles={PRODUCT_IMAGE_FILE_MAX_COUNT}
              maxSize={PRODUCT_IMAGE_FILE_MAX_SIZE_BYTES}
              files={imagesWithPreview}
              setFiles={setImagesWithPreview}
              setDeletedFiles={setDeletedImages}
              // isUploading={isUploading}
              disabled={isLoading}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.images?.message}
          />
          <h1>Progress: {imagesUploadProgress}</h1>
        </FormItem>
        <div className="grid grid-cols-2 gap-4">
          <LoadingButton
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Update
            <span className="sr-only">Update Product</span>
          </LoadingButton>
          <Button variant="destructive" disabled={isLoading}>
            Delete
            <span className="sr-only">Delete product</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
