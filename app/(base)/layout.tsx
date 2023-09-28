import { getCurrentUserAction } from "@/lib/actions/user";
import { CartItemsProvdier } from "@/context/cart-items-context";
import { UserCollectionsProvdier } from "@/context/user-collections";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default async function BaseLayout({ children }: BaseLayoutProps) {
  const user = await getCurrentUserAction();

  return (
    <CartItemsProvdier>
      <UserCollectionsProvdier>
        <div className="flex min-h-screen flex-col">
          <SiteHeader user={user} />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </UserCollectionsProvdier>
    </CartItemsProvdier>
  );
}
