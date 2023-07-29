import Link from "next/link";
import { cn } from "@/lib/utils";
// import { MainNav } from "@/components/layout/main-nav";
import { buttonVariants } from "@/components/ui/button";
import { CartSheet } from "@/components/cart/cart-sheet";
import { SearchForm } from "@/components/form/search-form";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UserDropdownMenu } from "@/components/user-dropdown-menu";
import { NavItem } from "@/types";
import { User } from "next-auth";
import { env } from "@/env.mjs";
import { SubNav } from "./sub-nav";
import { Icons } from "../icons";

interface SiteHeaderProps {
  user?: User;
  navItems?: NavItem[];
}

export function SiteHeader({ user, navItems }: SiteHeaderProps) {
  const isAdmin = user?.email === env.ADMIN_EMAIL;

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex items-center justify-between py-4">
        {/* <MainNav items={navItems} /> */}
        <Link href="/" className="flexitems-center">
          <Icons.voxellax className="w-28" />
        </Link>
        <nav className="flex gap-2 sm:gap-8">
          <div className="hidden lg:block">
            <SearchForm size="sm" />
          </div>
          <CartSheet />

          {!user ? (
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
            <UserDropdownMenu user={user} isAdmin={isAdmin} />
          )}

          <div className="sm:hidden">
            <MobileNav navItems={navItems} />
          </div>
        </nav>
      </div>
      <div className="hidden sm:block">
        <SubNav />
      </div>
    </header>
  );
}
