import Link from "next/link";
import { MainNavItem } from "@/types";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { siteConfig } from "@/config/site";

interface MainNavProps {
  items?: MainNavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex justify-between gap-6 md:gap-10">
      <Link href="/" className="flexitems-center">
        <Icons.voxellax className="w-28 hidden sm:block"/>
        <div className="w-9 aspect-square block sm:hidden">
          <Image src={logo} alt={siteConfig.name} className="w-full"/>
        </div>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
