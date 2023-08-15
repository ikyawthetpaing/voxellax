import { dashboardConfig } from "@/config/dashboard";
import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const sidebarNavItems = dashboardConfig.sidebarNavItems;
  return (
    <div className="flex h-screen">
      <Sidebar navItems={sidebarNavItems} className="hidden md:flex" />
      <main className="relative flex-1 overflow-y-auto">
        <DashboardHeader navItems={sidebarNavItems} />
        {children}
      </main>
    </div>
  );
}
