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
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

type Review = {
  message?: string,
  rate: number
}

type License = {
  type: string,
  price: number
}

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
  currency: string,
  images: string[],
  categories: string[],
  reviews?: Review[],
  license?: License[]
}
