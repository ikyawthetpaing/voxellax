import { cartPatchSchema } from "@/lib/validations/cart";
import {
  productImagePostSchema,
  productImagesPatchSchema,
  productLicenseSchema,
  productPatchSchema,
  productPostSchema,
  productFormSchema,
} from "@/lib/validations/product";
import { storePatchSchema, storePostSchema } from "@/lib/validations/store";
import { FileWithPath } from "react-dropzone";
import * as z from "zod";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
  placeholderImageUrl: string;
};

export type NavItem = {
  title: string;
  href: string;
};

export type FileWithPreview = FileWithPath & {
  uploaded?: {
    uploadthingKey: string;
    size: number;
    isThumbnail: boolean;
  };
  preview: string;
  index: number | null;
};

export type Option = {
  label: string;
  value: string;
};

export type ProductLicenseSchema = z.infer<typeof productLicenseSchema>;
export type ProductFormSchema = z.infer<typeof productFormSchema>;
export type ProductPostSchema = z.infer<typeof productPostSchema>;
export type ProductPatchSchema = z.infer<typeof productPatchSchema>;
export type ProdcutImagePostSchema = z.infer<typeof productImagePostSchema>;
export type ProductImagesPatchSchema = z.infer<typeof productImagesPatchSchema>;
export type StorePostSchema = z.infer<typeof storePostSchema>;
export type StorePatchSchema = z.infer<typeof storePatchSchema>;
export type CartPatchSchema = z.infer<typeof cartPatchSchema>;
