"use client";

import { HTMLAttributes } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/types";

import { cn } from "@/lib/utils";

interface ProfileNavbar extends HTMLAttributes<HTMLDivElement> {
  items: NavItem[];
}

export function Tabs({ items, className, ...props }: ProfileNavbar) {
  const pathname = usePathname();
  return items.length ? (
    <div
      className={cn(
        "grid h-9 w-max overflow-x-scroll rounded-lg bg-secondary p-1 text-muted-foreground",
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            "flex justify-center rounded-md px-3 py-1 text-sm font-medium",
            {
              "bg-background text-foreground":
                // pathname.split("/").slice(0, 3).join("/") === item.href ||
                pathname === item.href,
            }
          )}
        >
          {item.title}
        </Link>
      ))}
    </div>
  ) : null;
}
