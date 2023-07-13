import { Shell } from "@/components/shell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
  description: "View, send messages and give cupons to your customers",
};

export default function DashboardCustomersPage() {
  return (
    <Shell>
      <div>DashboardCustomersPage</div>
    </Shell>
  );
}
