import Link from "next/link";

import { NavItem } from "@/types";
import { Icons } from "@/components/icons";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex justify-between gap-6 md:gap-10">
      <Link href="/" className="flexitems-center">
        <Icons.voxellax className="w-28" />
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 sm:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
