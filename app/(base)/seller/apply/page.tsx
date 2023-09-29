import Link from "next/link";
import { redirect } from "next/navigation";

import { isCurrentUserHaveStore } from "@/lib/actions/store";
import { getCurrentUser } from "@/lib/actions/user";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ApplySellerApplicationForm } from "@/components/forms/apply-seller-application";
import { Heading } from "@/components/heading";
import { Shell } from "@/components/shell";

export default async function ApplySellerPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login");
  }

  const isUserHaveStore = await isCurrentUserHaveStore();

  return (
    <Shell>
      {user.role == "user" ? (
        <div className="mx-auto w-full sm:w-[600px]">
          <ApplySellerApplicationForm user={user} />
        </div>
      ) : (
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center sm:mt-8 md:mt-16 lg:mt-32">
          {isUserHaveStore ? (
            <>
              <Heading size="2xl">
                You currently have an existing store.
              </Heading>
              <Link href="/dashboard" className={cn(buttonVariants())}>
                Go to Dashboard
              </Link>
            </>
          ) : (
            <>
              <Heading size="2xl">You are already engaged as a seller.</Heading>
              <Link href="/seller/new-store" className={cn(buttonVariants())}>
                Create New Store
              </Link>
            </>
          )}
        </div>
      )}
    </Shell>
  );
}
