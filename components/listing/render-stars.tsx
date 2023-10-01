import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface RenderStarsProps extends HTMLAttributes<HTMLDivElement> {
  size: number;
  averageRate: number;
}

export function RenderStars({
  size,
  averageRate,
  className,
  ...props
}: RenderStarsProps) {
  const reviewStars = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className={cn("flex", className)} {...props}>
      {reviewStars.map((i) => (
        <Icons.star
          key={i}
          className={cn(`w-${size} h-${size} text-muted-foreground`, {
            "text-blue-500": i < averageRate,
          })}
        />
      ))}
    </div>
  );
}
