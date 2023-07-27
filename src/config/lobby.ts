import { NavItemsConfig } from "@/types";

export const lobbyConfig: NavItemsConfig = {
  navItems: [
    {
      title: "Free Assets",
      href: "/free-assets",
    },
  ],
};

export const lobbyProfileConfig: NavItemsConfig = {
  navItems: [
    {
      title: "Activity",
      href: "/profile/activity",
    },
    {
      title: "Likes",
      href: "/profile/likes",
    },
    {
      title: "Collections",
      href: "/profile/collections",
    },
  ],
};

export function lobbyStoreConfig(storeId: string): NavItemsConfig {
  return {
    navItems: [
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
    ],
  };
}

export const lobbyUserDropdownConfig: NavItemsConfig = {
  navItems: [
    {
      title: "Purchases",
      href: "/account/purchases",
      icon: "package",
    },
    {
      title: "Collections",
      href: "/profile/collections",
      icon: "bookmark",
    },
    {
      title: "Likes",
      href: "/profile/likes",
      icon: "heartOutline",
    },
    {
      title: "Settings",
      href: "/account/settings",
      icon: "settings",
    },
  ],
};
