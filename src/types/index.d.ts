import { Icons } from "@/components/icons";
import {
  productImagePostSchema,
  productImagesPatchSchema,
  productLicenseSchema,
  productPatchSchema,
  productPostSchema,
  productFormSchema,
} from "@/lib/validations/product";
import { FileWithPath } from "react-dropzone";
import * as z from "zod";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  // ogImage: string;
  // links: {
  //   twitter: string;
  //   github: string;
  // };
  placeholderImageUrl: string;
};

export type NavItem = {
  title: string;
  href: string;
  icon?: keyof typeof Icons;
};

export type NavItemsConfig = {
  navItems: NavItem[];
};

export type FileWithPreview = FileWithPath & {
  uploaded?: {
    uploadthingKey: string;
    size: number;
  };
  preview: string;
  index: number | null;
};

export type Option = {
  label: string;
  value: string;
};

export type MimeType = {
  extension: string;
  template: string;
};

export type ProductLicenseSchema = z.infer<typeof productLicenseSchema>;
export type ProductFormSchema = z.infer<typeof productFormSchema>;
export type ProductPostSchema = z.infer<typeof productPostSchema>;
export type ProductPatchSchema = z.infer<typeof productPatchSchema>;
export type ProdcutImagePostSchema = z.infer<typeof productImagePostSchema>;
export type ProductImagesPatchSchema = z.infer<typeof productImagesPatchSchema>;

type Review = {
  message?: string;
  rate: number;
};

export type License = {
  type: string;
  price?: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  categories: string[];
  licenses: License[];
  reviews?: Review[];
};

export type Purchase = {
  productId: string;
  licenseType: string;
};

export type Collection = {
  id: string;
  name: string;
  products: { id: string }[];
};

export type Activity = {
  action: string;
  date: string;
  productId: string;
};
