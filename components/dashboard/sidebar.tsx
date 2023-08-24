import { HTMLAttributes } from "react";
import { Store } from "@/db/schema";

import { SidebarNavItem } from "@/config/dashboard";
import { cn } from "@/lib/utils";

import { NavItems } from "./nav-items";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  store: Store;
  navItems: SidebarNavItem[];
}

export async function Sidebar({
  store,
  navItems,
  className,
  ...props
}: SidebarProps) {
  return (
    <section
      className={cn(
        "h-screen w-64 flex-col justify-between gap-8 overflow-y-auto border-r p-8",
        className
      )}
      {...props}
    >
      <NavItems store={store} navItems={navItems} />
    </section>
  );
}
