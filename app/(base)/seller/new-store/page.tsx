import { redirect } from "next/navigation";

import { isCurrentUserHaveStore } from "@/lib/actions/store";
import { getCurrentUser } from "@/lib/actions/user";
import { authOptions } from "@/lib/auth";
import { AddStoreForm } from "@/components/forms/add-store-form";
import { Shell } from "@/components/shell";

export default async function NewStorePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions.pages?.signIn || "/login");
  }
  if (user.role === "user") {
    redirect("/seller/apply");
  }
  const isUserHaveSTore = await isCurrentUserHaveStore();
  if (isUserHaveSTore) {
    redirect("/dashboard");
  }
  return (
    <Shell>
      <AddStoreForm />
    </Shell>
  );
}
