import Link from "next/link";
import { NavItem } from "@/types";

import { CartSheet } from "@/components/cart/cart-sheet";
import { Icons } from "@/components/icons";
import { CategoryNav } from "@/components/layout/category-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Search } from "@/components/search";
import { UserProfileMenu } from "@/components/user-profile-menu";

interface SiteHeaderProps {
  // user?: User;
  navItems?: NavItem[];
}

export function SiteHeader({ navItems }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flexitems-center">
          <Icons.voxellax className="w-28" />
        </Link>
        <nav className="flex gap-2 sm:gap-8">
          <div className="hidden w-80 md:block">
            <Search layout="default" />
          </div>
          <CartSheet />

          {/* {!user ? (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-full"
              )}
            >
              Login
            </Link>
          ) : (
            )} */}
          <UserProfileMenu />
          <div className="sm:hidden">
            <MobileNav navItems={navItems} />
          </div>
        </nav>
      </div>
      <div className="hidden sm:block">
        <CategoryNav />
      </div>
    </header>
  );
}
