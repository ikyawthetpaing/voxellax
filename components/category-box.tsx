import { HTMLAttributes } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Heading } from "@/components/heading";

import { AspectRatio } from "./ui/aspect-ratio";

interface Props extends HTMLAttributes<HTMLDivElement> {
  herf: string;
  title: string;
}

export function CategoryBox({ herf, title, className, ...props }: Props) {
  return (
    <Link href={herf}>
      <div
        className={cn("rounded-lg border p-2 hover:bg-accent", className)}
        {...props}
      >
        <AspectRatio ratio={4 / 3}>
          <Heading
            size="sm"
            className="flex h-full w-full items-center justify-center text-center font-medium text-muted-foreground"
          >
            {title}
          </Heading>
        </AspectRatio>
      </div>
    </Link>
  );
}
