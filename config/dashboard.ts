import { SidebarNavItem } from "@/types";

const sidebarNavItems: SidebarNavItem[] = [
  {
    navItem: {
      title: "Home",
      href: "/dashboard",
      icon: "home",
    },
  },
  {
    navItem: {
      title: "Store",
      href: `/dashboard/store`,
      icon: "store",
    },
    subNavItems: [
      { title: "Products", href: `/dashboard/store/products` },
      { title: "Orders", href: "/dashboard/store/orders", disabled: true },
      {
        title: "Subcriptions",
        href: "/dashboard/store/subcriptions",
        disabled: true,
      },
      {
        title: "Customers",
        href: "/dashboard/store/customers",
        disabled: true,
      },
      {
        title: "Discounts",
        href: "/dashboard/store/discounts",
        disabled: true,
      },
      {
        title: "Licenses",
        href: "/dashboard/store/licenses",
        disabled: true,
      },
    ],
  },
  {
    navItem: {
      title: "Email",
      href: "/dashboard/email",
      icon: "mail",
    },
    subNavItems: [
      {
        title: "Boardcasts",
        href: "/dashboard/email/boardcasts",
        disabled: true,
      },
      {
        title: "Subscribers",
        href: "/dashboard/email/subscribers",
        disabled: true,
      },
    ],
  },
  {
    navItem: {
      title: "Affiliates",
      href: "/dashboard/affiliates",
      icon: "megaphone",
    },
    subNavItems: [
      {
        title: "Overview",
        href: "/dashboard/affiliates/overview",
        disabled: true,
      },
      {
        title: "Clicks",
        href: "/dashboard/affiliates/clicks",
        disabled: true,
      },
      {
        title: "Refferals",
        href: "/dashboard/affiliates/refferals",
        disabled: true,
      },
      {
        title: "Payout",
        href: "/dashboard/affiliates/payout",
        disabled: true,
      },
      {
        title: "Creatives",
        href: "/dashboard/affiliates/creatives",
        disabled: true,
      },
    ],
  },
  {
    navItem: {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
    subNavItems: [
      { title: "General", href: "/dashboard/settings/general" },
      {
        title: "Domains",
        href: "/dashboard/settings/domains",
        disabled: true,
      },
      {
        title: "Integrations",
        href: "/dashboard/settings/integrations",
        disabled: true,
      },
      {
        title: "Webhooks",
        href: "/dashboard/settings/webhooks",
        disabled: true,
      },
      { title: "Email", href: "/dashboard/settings/email", disabled: true },
      {
        title: "Affiliates",
        href: "/dashboard/settings/affiliates",
        disabled: true,
      },
      {
        title: "Recovery",
        href: "/dashboard/settings/recovery",
        disabled: true,
      },
      { title: "Plans", href: "/dashboard/settings/plans", disabled: true },
      {
        title: "Billing",
        href: "/dashboard/settings/billing",
        disabled: true,
      },
      {
        title: "Payouts",
        href: "/dashboard/settings/payouts",
        disabled: true,
      },
      { title: "Team", href: "/dashboard/settings/team", disabled: true },
    ],
  },
];

export const dashboardConfig = {
  sidebarNavItems,
  getSubNavItems: (title: string) => {
    const subNavItems =
      sidebarNavItems.find(({ navItem }) => navItem.title === title)
        ?.subNavItems || [];
    return subNavItems;
  },
};
