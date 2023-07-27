import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

import data from "@/helpers/data.json";
import { Icons } from "@/components/icons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activity",
  description: "Track and view your activities",
};

interface UserPageProps {
  params: {
    user_id: string;
  };
}

export default function UserPage({ params }: UserPageProps) {
  return (
    <div className="grid gap-8">
      Tabs
      <div className="space-y-4">
        <Button variant="secondary">All activity</Button>
      </div>
      <div className="grid gap-8">
        {data.activities.map((activity, index) => {
          const product = data.products.find(
            ({ id }) => id === activity.productId
          );
          if (!product) {
            return null;
          }
          return (
            <div key={index} className="flex gap-4">
              <div className="w-40 shrink-0 overflow-hidden rounded-lg sm:w-48">
                <AspectRatio ratio={4 / 3}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </AspectRatio>
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <h1 className="line-clamp-3">
                  You {activity.action} {product.name}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icons.calendar className="h-4 w-4" />
                  <h1>{activity.date}</h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
