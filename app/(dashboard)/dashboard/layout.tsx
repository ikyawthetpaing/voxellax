import { redirect } from "next/navigation";

import { dashboardConfig } from "@/config/dashboard";
import { getCurrentUserStore } from "@/lib/actions/store";
import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const sidebarNavItems = dashboardConfig.sidebarNavItems;
  const store = await getCurrentUserStore();
  if (!store) {
    redirect("/seller/new-store");
  }
  return (
    <div className="flex h-screen">
      <Sidebar
        navItems={sidebarNavItems}
        className="hidden md:flex"
        store={store}
      />
      <main className="relative flex-1 overflow-y-auto">
        <DashboardHeader navItems={sidebarNavItems} store={store} />
        {children}
      </main>
    </div>
  );
}
