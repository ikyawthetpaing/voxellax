"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function LoginButton() {
  const pathname = usePathname();
  return (
    <Link
      href={`/login?from=${pathname}`}
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "rounded-full"
      )}
    >
      Login
    </Link>
  );
}
