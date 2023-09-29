import Link from "next/link";
import { NavItem } from "@/types";

import { User } from "@/db/schema";

import { Icons } from "@/components/icons";
import { CategoryNav } from "@/components/layout/category-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { LoginButton } from "@/components/login-button";
import { Search } from "@/components/search";
import { CartSheet } from "@/components/sheets/cart-sheet";
import { UserProfileMenu } from "@/components/user-profile-menu";

interface SiteHeaderProps {
  user?: User;
}

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flexitems-center">
          <Icons.voxellax className="w-28" />
        </Link>
        <nav className="flex gap-2 sm:gap-8">
          <div className="hidden w-80 md:block">
            <Search size="sm" />
          </div>
          <CartSheet />

          {!user ? <LoginButton /> : <UserProfileMenu user={user} />}
          <div className="sm:hidden">
            <MobileNav />
          </div>
        </nav>
      </div>
      <div className="hidden sm:block">
        <CategoryNav />
      </div>
    </header>
  );
}
