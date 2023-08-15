"use client";

import { HTMLAttributes } from "react";
import { data } from "@/constants/data-dev";

import { SidebarNavItem } from "@/config/dashboard";
import { cn } from "@/lib/utils";

import { NavItems } from "./nav-items";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  navItems: SidebarNavItem[];
}

export function Sidebar({ navItems, className, ...props }: SidebarProps) {
  const store = data.stores[0];
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
