import Link from "next/link";

import { Heading } from "@/components/heading";

import { AspectRatio } from "./ui/aspect-ratio";

interface Props {
  herf: string;
  title: string;
}

export function CategoryBox({ herf, title }: Props) {
  return (
    <Link href={herf}>
      <div className="rounded-lg border hover:bg-accent">
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
