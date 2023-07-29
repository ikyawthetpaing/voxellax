import { Icons } from "@/components/icons";
import { cartPatchSchema } from "@/lib/validations/cart";
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
  icon?: keyof typeof Icons;
};

export type NavItemsConfig = {
  navItems: NavItem[];
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

export type CartPatchSchema = z.infer<typeof cartPatchSchema>;
