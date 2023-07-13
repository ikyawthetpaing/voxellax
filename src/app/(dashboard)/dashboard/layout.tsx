import { SiteHeader } from "@/components/layout/site-header";
import { dashboardConfig } from "@/config/dashboard";
import { getCurrentUser } from "@/lib/session";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser();
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} navItems={dashboardConfig.navItems} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
