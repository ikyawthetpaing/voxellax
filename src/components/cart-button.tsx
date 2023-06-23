import { cn } from "@/lib/utils";
import Link from "next/link";
import { iconButtonVariants } from "@/components/icon-button";
import { Icons } from "@/components/icons";

export function CartButton() {
  return (
    <Link
      href="/cart"
      className={cn(
        iconButtonVariants({ variant: "secondary", size: "sm" }),
        "relative hover:shadow-none flex-shrink-0 hidden sm:block"
      )}
    >
      <Icons.shoppingCart className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <p className="absolute text-[10px] top-0 right-0 rounded-full bg-primary text-primary-foreground w-4 h-4 flex justify-center items-center">
        55
      </p>
    </Link>
  );
}
