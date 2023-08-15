// "use client";

// import {
//   Sheet,
//   SheetContent,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Input } from "@/components/ui/input";
// import { Button, buttonVariants } from "../ui/button";
// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import {
//   PRODUCT_DEFAULT_PRICE,
//   PRODUCT_DIGITAL_FILE_MAX_SIZE_BYTES,
//   PRODUCT_IMAGE_FILE_MAX_COUNT,
//   PRODUCT_IMAGE_FILE_MAX_SIZE_BYTES,
// } from "@/constants/product";
// import { getCategories, getSubcategories } from "@/config/category";
// import { cn } from "@/lib/utils";
// import { FileWithPreview } from "@/types";
// import { ProductFileForm } from "../forms/product-file-form";

// const priceSchema = z.string().regex(/^\d+(\.\d{1,2})?$/, {
//   message: "Must be a valid price",
// });

// const formSchema = z.object({
//   name: z.string().min(3).max(256),
//   description: z.string().min(3).max(256),
//   price: priceSchema,
//   category: z.string(),
//   subcategory: z.string().optional(),
//   // pricing: z.object({
//   //   leadMagnet: z.boolean(),
//   //   singlePayment: priceSchema,
//   //   payWhatYouWant: z.object({
//   //     minimumPrice: priceSchema,
//   //     suggestedPrice: priceSchema,
//   //   }),
//   // }),
// });

// interface ProductFormSheetProps {
//   trigger: JSX.Element;
// }

// export function ProductFormSheet({ trigger }: ProductFormSheetProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [imageFiles, setImageFiles] = useState<FileWithPreview>([]);
//   const [digitalFiles, setDigitalFiles] = useState<FileWithPreview>([]);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       price: PRODUCT_DEFAULT_PRICE.toString(),
//     },
//   });

//   const categories = getCategories();
//   const subcategories = getSubcategories(form.watch("category"));

//   function handleCancel() {
//     // form.reset();
//     // setImageFiles([]);
//     // setDigitalFiles([]);
//     setIsOpen(false);
//   }

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values, imageFiles, digitalFiles);
//   }

//   return (
//     <Sheet open={isOpen} onOpenChange={() => setIsOpen(true)}>
//       <SheetTrigger asChild>{trigger}</SheetTrigger>
//       <SheetContent
//         className="flex w-full flex-col sm:max-w-lg gap-0 p-0"
//         showCloseButton={false}
//       >
//         <SheetHeader className="p-6 border-b">
//           <SheetTitle>Create Product</SheetTitle>
//         </SheetHeader>

//         <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
//               <Accordion
//                 type="multiple"
//                 defaultValue={["general", "pricing", "topic", "media", "files"]}
//                 className="w-full grid gap-2"
//               >
//                 <AccordionItem value="general" className="border-0">
//                   <AccordionTrigger className="bg-accent/75 rounded-lg px-4 py-2 hover:no-underline hover:bg-accent">
//                     General
//                   </AccordionTrigger>
//                   <AccordionContent>
//                     <div className="grid gap-6 py-6 px-4">
//                       <FormField
//                         control={form.control}
//                         name="name"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Name *</FormLabel>
//                             <FormControl>
//                               <Input {...field} />
//                             </FormControl>
//                             <FormDescription>
//                               <p>Give your product a short and clear name.</p>
//                               <p>
//                                 50-60 characters is the recommended length for
//                                 search engines.
//                               </p>
//                             </FormDescription>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="description"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Description *</FormLabel>
//                             <FormControl>
//                               <Input {...field} />
//                             </FormControl>
//                             <FormDescription>
//                               <p>
//                                 Give your product a short and clear description.
//                               </p>
//                               <p>
//                                 120-160 characters is the recommended length for
//                                 search engines.
//                               </p>
//                             </FormDescription>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>
//                 <AccordionItem value="pricing" className="border-0">
//                   <AccordionTrigger className="bg-accent/75 rounded-lg px-4 py-2 hover:no-underline hover:bg-accent">
//                     Pricing
//                   </AccordionTrigger>
//                   <AccordionContent>
//                     <div className="py-6 px-4">
//                       <FormField
//                         control={form.control}
//                         name="price"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Price *</FormLabel>
//                             <FormControl>
//                               <Input {...field} className="text-right" />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>
//                 <AccordionItem value="topic" className="border-0">
//                   <AccordionTrigger className="bg-accent/75 rounded-lg px-4 py-2 hover:no-underline hover:bg-accent">
//                     Topic
//                   </AccordionTrigger>
//                   <AccordionContent>
//                     <div className="flex flex-col items-start gap-6 sm:flex-row py-6 px-4">
//                       <FormField
//                         control={form.control}
//                         name="category"
//                         render={({ field }) => (
//                           <FormItem className="w-full">
//                             <FormLabel>Category</FormLabel>
//                             <FormControl>
//                               <Select
//                                 value={field.value}
//                                 onValueChange={(value: typeof field.value) =>
//                                   field.onChange(value)
//                                 }
//                               >
//                                 <SelectTrigger className="capitalize">
//                                   <SelectValue placeholder={field.value} />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   <SelectGroup>
//                                     {categories.map(({ label, value }) => (
//                                       <SelectItem
//                                         key={value}
//                                         value={value}
//                                         className="capitalize"
//                                       >
//                                         {label}
//                                       </SelectItem>
//                                     ))}
//                                   </SelectGroup>
//                                 </SelectContent>
//                               </Select>
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="subcategory"
//                         render={({ field }) => (
//                           <FormItem className="w-full">
//                             <FormLabel>Subcategory</FormLabel>
//                             <FormControl>
//                               <Select
//                                 value={field.value?.toString()}
//                                 onValueChange={field.onChange}
//                               >
//                                 <SelectTrigger>
//                                   <SelectValue placeholder="Select a subcategory" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   <SelectGroup>
//                                     {subcategories.map((option) => (
//                                       <SelectItem
//                                         key={option.value}
//                                         value={option.value}
//                                       >
//                                         {option.label}
//                                       </SelectItem>
//                                     ))}
//                                   </SelectGroup>
//                                 </SelectContent>
//                               </Select>
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>
//                 <AccordionItem value="media" className="border-0">
//                   <AccordionTrigger className="bg-accent/75 rounded-lg px-4 py-2 hover:no-underline hover:bg-accent">
//                     Media
//                   </AccordionTrigger>
//                   <AccordionContent>
//                     <div className="py-6 px-4">
//                       <ProductFileForm
//                         accept={{ "image/*": [] }}
//                         uploadFor="product-image-file"
//                         maxFiles={PRODUCT_IMAGE_FILE_MAX_COUNT}
//                         maxSize={PRODUCT_IMAGE_FILE_MAX_SIZE_BYTES}
//                         files={imageFiles}
//                         setFiles={setImageFiles}
//                       />
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>
//                 <AccordionItem value="files" className="border-0">
//                   <AccordionTrigger className="bg-accent/75 rounded-lg px-4 py-2 hover:no-underline hover:bg-accent">
//                     Files
//                   </AccordionTrigger>
//                   <AccordionContent>
//                     <div className="py-6 px-4">
//                       <ProductFileForm
//                         totalSize={PRODUCT_DIGITAL_FILE_MAX_SIZE_BYTES}
//                         files={digitalFiles}
//                         setFiles={setDigitalFiles}
//                         uploadFor="product-digital-file"
//                       />
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>
//               </Accordion>
//               <input type="submit" id="add-product-form-submit" hidden />
//             </form>
//           </Form>
//         </div>
//         <SheetFooter className="w-full grid grid-cols-2 gap-4 bottom-0 p-6 border-t">
//           <Button type="button" variant="outline" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <label
//             htmlFor="add-product-form-submit"
//             className={cn(buttonVariants())}
//           >
//             Publish
//           </label>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// }

"use client";

import { useState } from "react";
import { PRODUCT_DEFAULT_PRICE } from "@/constants/product";
import { FileWithPreview } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { ProductSchema, productSchema } from "@/lib/validations/product";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ProductForm } from "../forms/product-form";
import { Button, buttonVariants } from "../ui/button";

interface ProductFormSheetProps {
  trigger: JSX.Element;
}

export function ProductFormSheet({ trigger }: ProductFormSheetProps) {
  const submitId = "add-product-form-submit";
  const [isOpen, setIsOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<FileWithPreview>([]);
  const [digitalFiles, setDigitalFiles] = useState<FileWithPreview>([]);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      price: PRODUCT_DEFAULT_PRICE.toString(),
    },
  });

  function handleCancel() {
    // form.reset();
    // setImageFiles([]);
    // setDigitalFiles([]);
    setIsOpen(false);
  }

  function onSubmit(values: ProductSchema) {
    console.log(values, imageFiles, digitalFiles);
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
          />
        </div>
        <SheetFooter className="bottom-0 grid w-full grid-cols-2 gap-4 border-t p-6">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <label htmlFor={submitId} className={cn(buttonVariants())}>
            Publish
          </label>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
