import { HTMLAttributes } from "react";
import { IconType } from "@/types";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons";

interface Props extends HTMLAttributes<HTMLDivElement> {
  icon: IconType;
  message: string;
}

export function Empty({ icon, message, className, ...props }: Props) {
  return (
    <div
      className={cn("flex flex-col items-center gap-4 py-8", className)}
      {...props}
    >
      <Icon
        name={icon}
        className="h-16 w-16 text-muted-foreground"
        aria-hidden="true"
      />
      <p className="text-xl font-medium text-muted-foreground">{message}</p>
    </div>
  );
}
