import { FileWithPath } from "react-dropzone";

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
  authors: { name: string; url: string }[];
  creator: string;
  keywords: string[];
};

export type NavItem = {
  title: string;
  href: string;
  icon?: keyof typeof Icons;
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
