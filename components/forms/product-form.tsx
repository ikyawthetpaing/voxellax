"use client";

import { Dispatch, SetStateAction } from "react";
import { ProductFileWithPath, ProductImageWithPreview } from "@/types";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { getCategories, getSubcategories } from "@/config/category";
import {
  PRODUCT_DIGITAL_FILE_MAX_COUNT,
  PRODUCT_DIGITAL_FILE_MAX_SIZE_BYTES,
  PRODUCT_IMAGE_FILE_MAX_COUNT,
  PRODUCT_IMAGE_FILE_MAX_SIZE_BYTES,
} from "@/constants/product";

import { ProductSchema } from "@/lib/validations/product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ProductFileForm } from "@/components/forms/product-file-form";
import { ProductImageFileForm } from "@/components/forms/product-image-file-form";

interface ProductFormProps {
  form: UseFormReturn<ProductSchema>;
  onSubmit: SubmitHandler<ProductSchema>;
  imageFiles: ProductImageWithPreview[];
  setImageFiles: Dispatch<SetStateAction<ProductImageWithPreview[]>>;
  digitalFiles: ProductFileWithPath[];
  setDigitalFiles: Dispatch<SetStateAction<ProductFileWithPath[]>>;
  disabled: boolean;
  submitId: string;
}

export function ProductForm({
  form,
  onSubmit,
  imageFiles,
  setImageFiles,
  digitalFiles,
  setDigitalFiles,
  disabled,
  submitId,
}: ProductFormProps) {
  const categories = getCategories();
  const subcategories = getSubcategories(form.watch("category"));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <Accordion
          type="multiple"
          defaultValue={["general", "pricing", "topic", "media", "files"]}
          className="grid w-full gap-2"
        >
          <AccordionItem value="general" className="border-0">
            <AccordionTrigger className="rounded-lg bg-accent/75 px-4 py-2 hover:bg-accent hover:no-underline">
              General
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-6 px-4 py-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        <span>Give your product a short and clear name.</span>
                        <br />
                        <span>
                          50-60 characters is the recommended length for search
                          engines.
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription>
                        <span>
                          Give your product a short and clear description.
                        </span>
                        <br />
                        <span>
                          120-160 characters is the recommended length for
                          search engines.
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pricing" className="border-0">
            <AccordionTrigger className="rounded-lg bg-accent/75 px-4 py-2 hover:bg-accent hover:no-underline">
              Pricing
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 py-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price *</FormLabel>
                      <FormControl>
                        <Input {...field} className="text-right" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="topic" className="border-0">
            <AccordionTrigger className="rounded-lg bg-accent/75 px-4 py-2 hover:bg-accent hover:no-underline">
              Topic
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-6 px-4 py-6 sm:flex-row">
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
                          disabled={!subcategories.length}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {subcategories.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="media" className="border-0">
            <AccordionTrigger className="rounded-lg bg-accent/75 px-4 py-2 hover:bg-accent hover:no-underline">
              Media
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 py-6">
                <ProductImageFileForm
                  maxFiles={PRODUCT_IMAGE_FILE_MAX_COUNT}
                  maxSize={PRODUCT_IMAGE_FILE_MAX_SIZE_BYTES}
                  files={imageFiles}
                  setFiles={setImageFiles}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="files" className="border-0">
            <AccordionTrigger className="rounded-lg bg-accent/75 px-4 py-2 hover:bg-accent hover:no-underline">
              Files
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 py-6">
                <ProductFileForm
                  maxFiles={PRODUCT_DIGITAL_FILE_MAX_COUNT}
                  totalSize={PRODUCT_DIGITAL_FILE_MAX_SIZE_BYTES}
                  files={digitalFiles}
                  setFiles={setDigitalFiles}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <input type="submit" id={submitId} hidden disabled={disabled} />
      </form>
    </Form>
  );
}
