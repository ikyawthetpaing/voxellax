import { redirect } from "next/navigation";

import { getCurrentUserStore } from "@/lib/actions/store";
import { UpdateStoreForm } from "@/components/forms/update-store-form";
import { Heading } from "@/components/heading";
import { Shell } from "@/components/shell";

export default async function DashboardSettingsGeneralPage() {
  const store = await getCurrentUserStore();

  if (!store) {
    redirect("/sell/new-store");
  }

  return (
    <Shell layout="dashboard">
      <div>
        <Heading size="sm">Store settings</Heading>
        <p className="text-muted-foreground">
          View and update your store details
        </p>
      </div>
      <UpdateStoreForm store={store} />
    </Shell>
  );
}
