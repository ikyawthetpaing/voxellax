import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { HTMLAttributes } from "react";

interface RenderStarsProps extends HTMLAttributes<HTMLDivElement> {
  size: number;
  averageRates: number;
}

export function RenderStars({
  size,
  averageRates,
  className,
  ...props
}: RenderStarsProps) {
  const reviewStars = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className={cn("flex", className)} {...props}>
      {reviewStars.map((i) => (
        <Icons.star
          key={i}
          className={cn(`w-${size} h-${size}`, {
            "text-red-500": i < averageRates,
          })}
        />
      ))}
    </div>
  );
}
