import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Become a Seller",
  description: "Become a seller on Voxellax.",
};

export default function SellOnVoxellaxPage() {
  return (
    <Shell>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center sm:mt-8 md:mt-16 lg:mt-32">
        <Heading size="2xl">
          Transform your creative passion into a chance for success.
        </Heading>
        <p>
          Become part of a world-class design marketplace that links exceptional
          creators such as yourself with a community comprising millions of
          potential customers.
        </p>
        <Link href="/seller/apply" className={cn(buttonVariants())}>
          Get started
        </Link>
      </div>
    </Shell>
  );
}
