import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AddStoreForm } from "@/components/form/add-store-form";
import { Shell } from "@/components/shell";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "New Store",
  description: "Add a new store",
};

export default async function NewStorePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <Shell>
      <div className="grid gap-1">
        <h1 className="line-clamp-1 text-3xl font-bold tracking-tight">
          New Store
        </h1>

        <p className="line-clamp-2 text-muted-foreground">
          Get ready to take your online presence to the next level! With our
          easy-to-use platform.
        </p>
      </div>
      <AddStoreForm />
    </Shell>
  );
}
