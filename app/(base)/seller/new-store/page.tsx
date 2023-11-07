import { Metadata } from "next";
import { redirect } from "next/navigation";

import { isCurrentUserHaveStore } from "@/lib/actions/store";
import { getCurrentUser } from "@/lib/actions/user";
import { AddStoreForm } from "@/components/forms/add-store-form";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Create a New Store",
  description:
    "Launch your own store online and sell products with our easy store creation process. Get started with our platform today.",
};

export default async function NewStorePage() {
  const user = await getCurrentUser();

  if (!user) return null;
  if (user.role === "user") redirect("/seller/apply");
  if (await isCurrentUserHaveStore()) redirect("/dashboard");

  return (
    <Shell>
      <AddStoreForm />
    </Shell>
  );
}
