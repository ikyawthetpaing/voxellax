import { SiteFooter } from "@/components/layout/site-footer";
import { getCurrentUser } from "@/lib/session";
import { SiteHeader } from "@/components/layout/site-header";
import { baseConfig } from "@/config/base";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} navItems={baseConfig.mainNavItems} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
