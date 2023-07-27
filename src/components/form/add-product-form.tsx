"use client";

import type {
  FileWithPreview,
  ProductLicenseSchema,
  ProdcutImagePostSchema,
  ProductFormSchema,
  ProductPostSchema,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  PRODUCT_DEFAULT_PRICE,
  PRODUCT_IMAGE_FILE_MAX_COUNT,
  PRODUCT_IMAGE_FILE_MAX_SIZE_BYTES,
} from "@/constants/product";
import { ProductImageFileForm } from "./product-image-file-form";

interface AddProductFormProps {
  storeId: string;
}

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export function AddProductForm({ storeId }: AddProductFormProps) {
  const [imagesWithPreview, setImagesWithPreview] = useState<FileWithPreview[]>(
    []
  );
  // const [images, setImages] = useState<ProdcutImageSchema[]>([]);
  const [licenses, setLicenses] = useState<ProductLicenseSchema[]>([]);
  const [totalLicenses, setTotalLicenses] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesUploadProgress, setImagesUploadProgress] = useState(0);
  const router = useRouter();

  const categories = getCategories();

  // react-hook-form
  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "69 T-shrits",
      category: categories[0].value,
      licenses: licenses,
      description: "some description",
    },
  });

  const { isUploading: isImagesUploading, startUpload: startImagesUpload } =
    useUploadThing("productImage", {
      onUploadError: (error: Error) => {
        toast({
          title: error.name,
          description: error.message,
          variant: "destructive",
        });
      },
      onUploadProgress: (progress: number) => {
        setImagesUploadProgress(progress);
      },
    });

  useEffect(() => {
    form.setValue("licenses", licenses);
  }, [form, licenses]);

  // Get subcategories based on category
  const subcategories = getSubcategories(form.watch("category"));

  async function onSubmit(data: ProductFormSchema) {
    setIsLoading(true);
    try {
      const images: ProdcutImagePostSchema[] = [];

      if (isArrayOfFile(imagesWithPreview)) {
        await Promise.all(
          imagesWithPreview.map(async (newAddedFile) => {
            const res = await startImagesUpload([newAddedFile]);
            res?.forEach(({ fileKey }) =>
              images.push({
                key: fileKey,
                index: newAddedFile.index ?? 0,
                isThumbnail: newAddedFile.index === 0,
              })
            );
          })
        );
      }

      if (!images.length) {
        throw new Error("Array must contain at least 1 element(s)!");
      }

      const postData: ProductPostSchema = {
        name: data.name,
        category: data.category,
        licenses: data.licenses,
        description: data.description,
        subcategory: data.subcategory,
        images: images,
      };

      console.log(postData);

      await fetch(`/api/stores/${storeId}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      form.reset();
      router.push(`/dashboard/stores/${storeId}/products`);
      router.refresh(); // Workaround for the inconsistency of cache revalidation
      toast({
        description: "Your new product created successfully.",
      });
    } catch (error) {
      toast({
        title: "Your new product was not created.",
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
                  <Select
                    value={field.value}
                    onValueChange={(value: typeof field.value) =>
                      field.onChange(value)
                    }
                  >
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
                  <Select
                    value={field.value?.toString()}
                    onValueChange={field.onChange}
                  >
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
                          value={licenses[index]?.type}
                          onValueChange={(e) => {
                            const newLicenses = [...licenses];
                            newLicenses[index] = { type: e };

                            setLicenses(newLicenses);
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
                                    licenses.find(
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
                            onChange={(e) => {
                              const newLicenses = [...licenses];
                              newLicenses[index] = {
                                ...newLicenses[index],
                                price: e.target.value,
                              };
                              setLicenses(newLicenses);
                            }}
                            disabled={licenses[index]?.type === undefined}
                            placeholder="Type license price here..."
                            value={
                              licenses[index]?.price ?? PRODUCT_DEFAULT_PRICE
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
                            const newLicenses = [...licenses];
                            newLicenses.splice(index, 1);
                            setLicenses(newLicenses);
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
              isUploading={isImagesUploading}
              disabled={isLoading}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.images?.message}
          />
          <h1>Progress: {imagesUploadProgress}</h1>
        </FormItem>
        <LoadingButton
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          className="w-fit"
        >
          Add Product
          <span className="sr-only">Add Product</span>
        </LoadingButton>
      </form>
    </Form>
  );
}
