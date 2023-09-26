import { Author } from "next/dist/lib/metadata/types/metadata-types";
import { FileWithPath } from "react-dropzone";

import { Product } from "@/db/schema";

import { type Icons } from "@/components/icons";

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
  authors: Author[];
  creator: string;
  keywords: string[];
};

export type Icon = keyof typeof Icons;

export type NavItem = {
  title: string;
  href: string;
  icon?: Icon;
  disabled?: boolean;
};

export type FileWithPreview = FileWithPath & {
  preview?: string;
  index?: number;
  isThumbnail?: boolean;
  uploaded?: UploadedFile;
};

export type ProductImageWithPreview = FileWithPath & {
  preview: string;
  index: number;
  isThumbnail: boolean;
  uploaded?: UploadedFile;
};

export type ProductFileWithPath = FileWithPath & {
  uploaded?: UploadedFile;
};

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}

export interface Option {
  label: string;
  value: string;
}

export type UploadedFile = {
  name: string;
  key: string;
  url: string;
  size: number;
};

export interface ProductImageUploadedFile extends UploadedFile {
  index: number;
  isThumbnail: boolean;
}

export type Category = {
  label: string;
  value: string;
  description: string;
  subcategories: {
    label: string;
    description?: string;
    value: string;
  }[];
};

export type SidebarNavItem = {
  navItem: NavItem;
  subNavItems?: NavItem[];
};

export type FilterItem = {
  title: string;
  key: string;
  type: "multiple" | "single";
  options: Option[];
};

export type QueryParam = {
  key: string;
  value: string | null;
};

export type Invoice = {
  productId: string;
  cost: number;
  purchasedAt: Date;
};

export type InvoiceProduct = Product & Invoice;
