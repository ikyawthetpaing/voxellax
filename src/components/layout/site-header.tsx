import Link from "next/link";
import { cn } from "@/lib/utils";
import { MainNav } from "@/components/layout/main-nav";
import { buttonVariants } from "@/components/ui/button";
import { CartSheet } from "@/components/cart/cart-sheet";
import { SearchForm } from "@/components/form/search-form";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UserDropdownMenu } from "@/components/user-dropdown-menu";
import { NavItem } from "@/types";
import { User } from "next-auth";
import { env } from "@/env.mjs";

interface SiteHeaderProps {
  user?: User;
  navItems?: NavItem[];
}

export function SiteHeader({ user, navItems }: SiteHeaderProps) {
  const isAdmin = user?.email === env.ADMIN_EMAIL;

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex items-center justify-between gap-6 py-4">
        <div className="sm:hidden">
          <MobileNav navItems={navItems} />
        </div>
        <MainNav items={navItems} />

        <nav className="flex gap-4 sm:gap-8">
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
        </nav>
      </div>
    </header>
  );
}
