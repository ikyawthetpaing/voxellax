import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { MainNav } from "@/components/main-nav";
import { marketingConfig } from "@/config/marketing";
import { UserSearch } from "@/components/user-search";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import { UserDropdownMenu } from "@/components/user-dropdown-menu";
import { CartButton } from "@/components/cart-button";
import { env } from "@/env.mjs";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser();
  const isAdmin = user?.email === env.ADMIN_EMAIL;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background sticky top-0 border-b">
        <div className="flex justify-between h-20 items-center gap-6 py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav className="flex gap-6">
            <UserSearch />
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
              <UserDropdownMenu user={user} isAdmin={isAdmin}/>
            )}
            <CartButton />
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
