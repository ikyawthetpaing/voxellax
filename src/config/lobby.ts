import { NavItemsConfig } from "@/types";

export const lobbyConfig: NavItemsConfig = {
  navItems: [
    {
      title: "Free Assets",
      href: "/free-assets",
    },
  ],
};

export function lobbyUserConfig(userId: string) {
  return {
    navItems: [
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
    ],
  };
}

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

export function lobbyUserDropdownConfig(userId: string) {
  return {
    navItems: [
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
    ],
  };
}
