import { type Icons } from "@/components/icons";

export type SiteConfig = {
  name: string;
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
  index: number;
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
