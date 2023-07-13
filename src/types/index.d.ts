import { Icons } from "@/components/icons";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  // ogImage: string;
  // links: {
  //   twitter: string;
  //   github: string;
  // };
};

export type NavItem = {
  title: string;
  href: string;
  icon?: keyof typeof Icons;
};

// export type MarketingConfig = {
//   navItems: NavItem[];
// };

// export type ProfileConfig = {
//   navItems: NavItem[];
// };

// export type DropdownConfig = {
//   navItems: NavItem[];
// };

export type NavItemsConfig = {
  navItems: NavItem[];
};

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

export type FileWithPreview = FileWithPath & {
  preview: string
}

export type Option = {
  label: string
  value: string
}