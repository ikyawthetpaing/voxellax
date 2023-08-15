"use client";

import { HTMLAttributes, useState } from "react";
import { data } from "@/constants/data-dev";

import { SidebarNavItem } from "@/config/dashboard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavItems } from "@/components/dashboard/nav-items";
import { Icons } from "@/components/icons";

interface DashboardMobileNavProps extends HTMLAttributes<HTMLDivElement> {
  navItems: SidebarNavItem[];
}

export function DashboardMobileNav({
  navItems,
  className,
  ...props
}: DashboardMobileNavProps) {
  const [open, setOpen] = useState(false);
  const store = data.stores[0]; // <- dev

  return (
    <div className={className} {...props}>
      <Sheet open={open} onOpenChange={() => setOpen(true)}>
        <SheetTrigger asChild>
          <Button
            aria-label="Open cart"
            variant="outline"
            size="icon"
            className="relative rounded-full"
          >
            <Icons.menu className="h-4 w-4" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex h-full flex-col justify-between gap-8 overflow-y-auto p-8 sm:max-w-lg"
          showCloseButton={false}
          onPointerDownOutside={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          <NavItems store={store} navItems={navItems} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
