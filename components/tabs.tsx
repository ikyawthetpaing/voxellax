"use client";

import { HTMLAttributes } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/types";

import { cn } from "@/lib/utils";

interface ProfileNavbar extends HTMLAttributes<HTMLDivElement> {
  navItems: NavItem[];
}

export function Tabs({ navItems, style }: ProfileNavbar) {
  const pathname = usePathname();
  return navItems.length ? (
    <div className="grid">
      <div className="hide-scrollbar w-full overflow-x-scroll">
        <div
          className="grid h-9 w-max rounded-lg bg-secondary p-1 text-muted-foreground"
          style={style}
        >
          {navItems.map((navItem, index) =>
            !navItem.disabled ? (
              <Link
                key={index}
                href={navItem.href}
                className={cn(
                  "flex justify-center rounded-md px-3 py-1 text-sm font-medium",
                  {
                    "bg-background text-foreground": pathname === navItem.href,
                  }
                )}
              >
                {navItem.title}
              </Link>
            ) : (
              <span
                key={index}
                className="flex cursor-not-allowed justify-center rounded-md px-3 py-1 text-sm font-medium"
              >
                {navItem.title}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  ) : null;
}
