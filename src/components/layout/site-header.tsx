import Link from "next/link";
import { env } from "@/env.mjs";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import { MainNav } from "@/components/layout/main-nav";
import { buttonVariants } from "@/components/ui/button";
import { CartSheet } from "@/components/cart/cart-sheet";
import { SearchForm } from "@/components/form/search-form";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UserDropdownMenu } from "@/components/user-dropdown-menu";
import { NavItem } from "@/types";

interface SiteHeaderProps {
  user?: User;
  navItems?: NavItem[]
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

// import Link from "next/link";
// import { env } from "@/env.mjs";
// import { cn } from "@/lib/utils";
// import { User } from "next-auth";
// import { MainNav } from "@/components/layout/main-nav";
// import { buttonVariants } from "@/components/ui/button";
// import { CartSheet } from "@/components/cart/cart-sheet";
// import { SearchForm } from "@/components/form/search-form";
// import { MobileNav } from "@/components/layout/mobile-nav";
// import { UserDropdownMenu } from "@/components/user-dropdown-menu";
// import { NavItem } from "@/types";

// interface SiteHeaderProps {
//   user: User | undefined;
//   navItems: NavItem[];
//   layout: "default" | "store"
// }

// export function SiteHeader({ user, navItems, layout = "default" }: SiteHeaderProps) {
//   const isAdmin = user?.email === env.ADMIN_EMAIL;

//   return (
//     <header className="border-b z-40 bg-background sticky top-0">
//       <div className="container flex justify-between h-20 items-center gap-6 py-6">
//         <div className="sm:hidden">
//           <MobileNav navItems={navItems} />
//         </div>

//         <MainNav items={navItems} />

//         <nav className="flex gap-4 sm:gap-8">
//           <div className={cn("flex", {"hidden" : layout === "store"})}>
//             <div className="hidden lg:block">
//               <SearchForm size="sm" />
//             </div>
//             <CartSheet />
//           </div>
//           {!user ? (
//             <Link
//               href="/login"
//               className={cn(
//                 buttonVariants({ variant: "outline", size: "sm" }),
//                 "rounded-full"
//               )}
//             >
//               Login
//             </Link>
//           ) : (
//             <UserDropdownMenu user={user} isAdmin={isAdmin} />
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }
