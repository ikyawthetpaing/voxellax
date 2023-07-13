"use client";

import * as React from "react";
// import { products } from "@/db/schema";
import type { FileWithPreview } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
// import { generateReactHelpers } from "@uploadthing/react/hooks";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import { type z } from "zod";

// import { getSubcategories } from "@/config/products";
// import { isArrayOfFile } from "@/lib/utils";
import {
  productSchema,
  productLicensesSchema,
} from "@/lib/validations/product";
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
import { FileDialog } from "@/components/file-dialog";
// import { addProductAction, checkProductAction } from "@/app/_actions/product";
// import type { OurFileRouter } from "@/app/api/uploadthing/core";
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
import { getSubcategories, productCategories } from "@/config/category";
import { licenses as licenseTypes } from "@/config/license";

interface AddProductFormProps {
  storeId: string;
}

type Inputs = z.infer<typeof productSchema>;
type Licenses = z.infer<typeof productLicensesSchema>;

// const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export function AddProductForm({ storeId }: AddProductFormProps) {
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null);
  const [licenses, setLicenses] = React.useState<Licenses>([]);
  const [totalLicenses, setTotalLicenses] = React.useState(1);
  const [isPending, startTransition] = React.useTransition();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  // uploadthing
  // const { isUploading, startUpload } = useUploadThing("productImage");

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "69 T-shrits",
      category: "Graphics",
      licenses: licenses,
      description: "some description",
      subcategory: "T-shirts",
      images: [
        { url: "https://fakeimg.pl/600x400" },
        { url: "https://fakeimg.pl/1080x1080/d17777/402f2f?font=museo" },
        { url: "https://fakeimg.pl/1080x600/d17777/402f2f?font=museo" },
      ],
    },
  });

  React.useEffect(() => {
    form.setValue("licenses", licenses);
  }, [licenses]);

  // Get subcategories based on category
  const subcategories = getSubcategories(form.watch("category"));

  async function onSubmit(data: Inputs) {
    console.log(data);

    // setIsLoading(true);

    // const response = await fetch(`/api/stores/${storeId}/products`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: data.name,
    //     category: data.category,
    //     licenses: data.licenses,
    //     description: data.description,
    //     subcategory: data.subcategory,
    //     images: data.images,
    //   }),
    // });

    // setIsLoading(false);

    // if (!response?.ok) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: "Your new product was not created. Please try again.",
    //     variant: "destructive",
    //   });
    // }

    // form.reset();
    // router.push(`/dashboard/stores/${storeId}/products`);
    // router.refresh(); // Workaround for the inconsistency of cache revalidation
    // return toast({
    //   description: "New product created successfully.",
    // });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
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
                        {productCategories.map(({ title }) => (
                          <SelectItem
                            key={title}
                            value={title}
                            className="capitalize"
                          >
                            {title}
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
          {/* <FormField
            control={form.control}
            name="licenses"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>License</FormLabel>
                {Array.from({ length: totalLicenses }, (_, index) => (
                  <div key={index} className="grid grid-cols-2 gap-6">
                    <FormControl className="w-1/2 flex-1">
                      <Select
                        value={field.value[index]?.type ?? ""}
                        onValueChange={field.onChange.}
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
                                  field.value.find(
                                    (_license) => _license.type === license.type
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
                      <div>
                        <Input
                          onChange={(e) => {
                            field.value[index] = {
                              ...field.value[index],
                              price: e.target.value,
                            };
                          }}
                          disabled={field.value[index]?.type === undefined}
                          placeholder="Type license price here..."
                          value={field.value[index]?.price ?? "0.00"}
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
                        className="px-3"
                        variant="outline"
                        onClick={() => {
                          field.value.splice(index, 1);
                          setTotalLicenses(totalLicenses - 1);
                        }}
                      >
                        <Icons.trash className="w-4 h-4" />
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
                    <Icons.plus className="w-4 h-4" />
                  </Button>
                )}
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormItem className="grid w-full">
            <FormLabel>License</FormLabel>
            {Array.from({ length: totalLicenses }, (_, index) => (
              <div key={index} className="grid grid-cols-2 gap-6">
                <FormControl className="w-1/2 flex-1">
                  <Select
                    value={licenses[index]?.type ?? ""}
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
                                (_license) => _license.type === license.type
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
                      value={licenses[index]?.price ?? "0.00"}
                    />
                    <UncontrolledFormMessage
                      message={
                        form.formState.errors.licenses &&
                        form.formState.errors.licenses[index]?.price?.message
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
                    <Icons.trash className="w-4 h-4" />
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
                <Icons.plus className="w-4 h-4" />
              </Button>
            )}
            <FormMessage />
          </FormItem>
        </div>
        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Images</FormLabel>
          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name="images"
              maxFiles={12}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
              // isUploading={isUploading}
              disabled={isPending}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.images?.message}
          />
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
