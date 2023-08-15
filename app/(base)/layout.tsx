import { baseConfig } from "@/config/base";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default async function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader navItems={baseConfig.mainNavItems} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
