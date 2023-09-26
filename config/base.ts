import { NavItem } from "@/types";

export const baseConfig = {
  mainNavItems: [
    {
      title: "Free Assets",
      href: "/free-assets",
    },
  ],
  profileMenu: {
    user: (userId: string) => {
      const navItems: NavItem[] = [
        {
          title: "Purchases",
          href: "/account/purchases",
        },
        {
          title: "Collections",
          href: `/user/${userId}/collections`,
        },
        {
          title: "Likes",
          href: `/user/${userId}/`,
        },
        {
          title: "Settings",
          href: "/account/settings",
        },
      ];
      return { navItems };
    },
    seller: () => {
      const navItems: NavItem[] = [
        {
          title: "Dashboard",
          href: "/dashboard",
        },
      ];
      return { navItems };
    },
  },
  userProfile: (userId: string) => {
    const navItems: NavItem[] = [
      {
        title: "Likes",
        href: `/user/${userId}`,
      },
      {
        title: "Collections",
        href: `/user/${userId}/collections`,
      },
      {
        title: "About",
        href: `/user/${userId}/about`,
      },
    ];
    return { navItems };
  },
  storeProfile: (storeId: string) => {
    const navItems: NavItem[] = [
      {
        title: "Shop",
        href: `/store/${storeId}`,
      },
      {
        title: "About",
        href: `/store/${storeId}/about`,
      },
      {
        title: "Announcements",
        href: `/store/${storeId}/announcements`,
      },
      {
        title: "Reviews",
        href: `/store/${storeId}/reviews`,
      },
    ];
    return { navItems };
  },
  featuredCategories: ["graphics", "e-books", "digital-art"],
  footerLinkGroups: [
    {
      label: "Resources",
      links: [
        { label: "Blog", value: "/about" },
        { label: "Collections", value: "/brands" },
        { label: "Help Center", value: "/careers" },
      ],
    },
    {
      label: "Earn",
      links: [
        { label: "Affiliate Partner Benefits", value: "/about" },
        { label: "Shop Benefits", value: "/brands" },
        { label: "Become an Ambassador", value: "/careers" },
      ],
    },
    {
      label: "The Goods",
      links: [
        { label: "Branding eBook", value: "/about" },
        { label: "Free Drops", value: "/brands" },
        { label: "Gift Cards", value: "/careers" },
      ],
    },
    {
      label: "Company",
      links: [
        { label: "About", value: "/about" },
        { label: "Brands", value: "/brands" },
        { label: "Careers", value: "/careers" },
      ],
    },
  ],
};
