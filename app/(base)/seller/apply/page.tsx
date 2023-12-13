import { Metadata } from "next";
import Link from "next/link";

import { User } from "@/db/schema";

import { isCurrentUserHaveStore } from "@/lib/actions/store";
import { getCurrentUser } from "@/lib/actions/user";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ApplySellerApplicationForm } from "@/components/forms/apply-seller-application";
import { Heading } from "@/components/heading";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Apply to Become a Seller",
  description:
    "Join our platform and submit your seller application to turn your passion into a business opportunity.",
};

async function renderApplicationForm(user: User) {
  return (
    <div className="mx-auto w-full sm:w-[600px]">
      <ApplySellerApplicationForm user={user} />
    </div>
  );
}

function renderExistingStore() {
  return (
    <>
      <Heading size="2xl">You currently have an existing store.</Heading>
      <Link href="/dashboard" className={cn(buttonVariants())}>
        Go to Dashboard
      </Link>
    </>
  );
}

function renderNewStore() {
  return (
    <>
      <Heading size="2xl">You are already engaged as a seller.</Heading>
      <Link href="/seller/new-store" className={cn(buttonVariants())}>
        Create a New Store
      </Link>
    </>
  );
}

export default async function ApplySellerPage() {
  const user = await getCurrentUser();
  const isUserHaveStore = await isCurrentUserHaveStore();

  return (
    <Shell>
      {user && (
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center sm:mt-8 md:mt-16 lg:mt-32">
          {user.role === "user"
            ? renderApplicationForm(user)
            : isUserHaveStore
              ? renderExistingStore()
              : renderNewStore()}
        </div>
      )}
    </Shell>
  );
}
