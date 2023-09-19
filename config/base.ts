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
          href: `/user/${userId}/likes`,
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
        title: "Activity",
        href: `/user/${userId}`,
      },
      {
        title: "Likes",
        href: `/user/${userId}/likes`,
      },
      {
        title: "Collections",
        href: `/user/${userId}/collections`,
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
};
