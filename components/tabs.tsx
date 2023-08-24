"use client";

import { HTMLAttributes } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/types";

import { cn } from "@/lib/utils";

interface ProfileNavbar extends HTMLAttributes<HTMLDivElement> {
  items: NavItem[];
}

export function Tabs({ items, style }: ProfileNavbar) {
  const pathname = usePathname();
  return items.length ? (
    <div className="grid">
      {/* <div className="hide-scrollbar flex w-full gap-1 overflow-x-scroll border-b pb-2">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex justify-center rounded-md px-3 py-1 text-sm font-medium",
              {
                "bg-accent text-accent-foreground": pathname === item.href,
              }
            )}
          >
            {item.title}
          </Link>
        ))}
      </div> */}
      <div className="hide-scrollbar w-full overflow-x-scroll">
        <div
          className="grid h-9 w-max rounded-lg bg-secondary p-1 text-muted-foreground"
          style={style}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex justify-center rounded-md px-3 py-1 text-sm font-medium",
                {
                  "bg-background text-foreground": pathname === item.href,
                }
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  ) : null;
}
