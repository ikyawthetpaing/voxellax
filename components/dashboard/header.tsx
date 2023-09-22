"use client";

import { usePathname } from "next/navigation";
import { Store } from "@/db/schema";
import { SidebarNavItem } from "@/types";

import { Button } from "@/components/ui/button";
import { AddProductFormSheet } from "@/components/dashboard/add-product-form-sheet";
import { DashboardMobileNav } from "@/components/dashboard/mobile-nav";
import { Icons } from "@/components/icons";
import { Shell } from "@/components/shell";

interface DashboardHeaderProps {
  store: Store;
  navItems: SidebarNavItem[];
}

export function DashboardHeader({ navItems, store }: DashboardHeaderProps) {
  const pathname = usePathname();

  let title = "";
  navItems.map(({ navItem, subNavItems }) => {
    if (subNavItems) {
      subNavItems.map((subItem) => {
        if (subItem.href === pathname) {
          title = subItem.title;
        }
      });
    } else {
      if (navItem.href === pathname) {
        title = navItem.title;
      }
    }
  });

  return (
    <Shell className="flex justify-between pb-0" layout="dashboard">
      <DashboardMobileNav
        store={store}
        navItems={navItems}
        className="md:hidden"
      />
      <h1 className="text-2xl font-medium">{title}</h1>
      <div className="flex gap-2">
        <Button size="icon" variant="secondary" className="rounded-full">
          <Icons.bell className="h-4 w-4" />
        </Button>
        <AddProductFormSheet
          storeId={store.id}
          trigger={
            <Button size="icon" className="rounded-full">
              <Icons.plus className="h-4 w-4" />
            </Button>
          }
        />
      </div>
    </Shell>
  );
}
