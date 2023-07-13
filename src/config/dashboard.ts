import type { NavItem, NavItemsConfig } from "@/types";

export type DashboardConfig = {
  navItems: NavItem[];
};

export const dashboardConfig: DashboardConfig = {
  navItems: [
    {
      title: "Overview",
      href: "/dashboard/overview",
      icon: "settings",
    },
    {
      title: "Stores",
      href: "/dashboard/stores",
      icon: "store",
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: "store",
    },
    {
      title: "Products",
      href: "/dashboard/products",
      icon: "store",
    },
  ],
};

export function dashboardStoreConfig(store_id: string): NavItemsConfig {
  return {
    navItems: [
      {
        title: "Store",
        href: `/dashboard/stores/${store_id}`,
      },
      {
        title: "Products",
        href: `/dashboard/stores/${store_id}/products`,
      },
      {
        title: "Payments",
        href: `/dashboard/stores/${store_id}/payments`,
      },
      {
        title: "Analytics",
        href: `/dashboard/stores/${store_id}/analytics`,
      },
    ],
  };
}
