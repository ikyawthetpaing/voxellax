"use client";

import { useRouter } from "next/navigation";

import { Button, ButtonProps } from "@/components/ui/button";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

interface BackButtonProps extends ButtonProps {}

export function BackButton({
  variant,
  size,
  className,
  ...props
}: BackButtonProps) {
  const router = useRouter();
  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => router.back()}
      className={cn("gap-2", className)}
      {...props}
    >
      <Icons.chevronLeft className="w-4 h-4" />
      Back
    </Button>
  );
}
