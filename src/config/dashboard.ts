import { NavItem } from "@/types";

type DashboardConfig = {
  navItems: NavItem[];
};

export const dashboardConfig: DashboardConfig = {
  navItems: [
    {
      title: "Overview",
      href: "/dashboard/overview",
    },
    {
      title: "Stores",
      href: "/dashboard/stores",
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
    },
    {
      title: "Products",
      href: "/dashboard/products",
    },
  ],
};

export function dashboardStoreConfig(store_id: string): DashboardConfig {
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
