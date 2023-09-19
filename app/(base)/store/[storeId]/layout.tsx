import Image from "next/image";
import { notFound } from "next/navigation";

import { baseConfig } from "@/config/base";
import { getStore } from "@/lib/actions/store";
import { formatDate } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Tabs } from "@/components/tabs";

interface StoreLayoutPageProps {
  params: {
    storeId: string;
  };
  children: React.ReactNode;
}

export default async function StoreLayoutPage({
  params,
  children,
}: StoreLayoutPageProps) {
  const store = await getStore(params.storeId);

  if (!store) {
    notFound();
  }

  const navItems = baseConfig.storeProfile(store.id).navItems;
  const navItemsLength = navItems.length;

  return (
    <div>
      <div>
        <AspectRatio ratio={5 / 1} className="w-full">
          {!store.cover ? (
            <div className="h-full w-full bg-accent"></div>
          ) : (
            <div>
              <Image
                src={store.cover.url}
                alt={store.cover.name}
                fill
                className="object-cover"
              />
            </div>
          )}
        </AspectRatio>
        <div className="container">
          <div className="relative">
            <div className="absolute h-24 w-24 -translate-y-1/2 overflow-hidden rounded-xl border-4 border-accent bg-background shadow-md sm:h-40 sm:w-40">
              {store.avatar && (
                <Image
                  src={store.avatar.url}
                  alt={store.avatar.name}
                  fill
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
        <div className="container mt-16 grid gap-4 sm:mt-24">
          <div>
            <Heading>{store.name}</Heading>
            <p className="text-muted-foreground">@{store.id}</p>
          </div>
          <div>
            Items <span className="font-semibold">19.5K</span> · Created{" "}
            <span className="font-semibold">
              {formatDate(store.createdAt ?? "")}
            </span>{" "}
            · Creator earnings <span className="font-semibold">2.5%</span> ·
            Chain <span className="font-semibold">Ethereum</span> · Category{" "}
            <span className="font-semibold">PFPs</span>
          </div>
          <div className="max-w-lg">
            <p className="text-foreground/75">
              Hi, I&apos;m BORT! Welcome to my visual goods store for graphic
              designers! With over 10 years of experience as a graphic designer.
            </p>
          </div>
          <div className="grid w-fit grid-cols-2 gap-6">
            <Button>Follow</Button>
            <Button variant="outline">Messsage</Button>
          </div>
        </div>
      </div>
      <div className="container mt-8">
        <Tabs
          items={navItems}
          style={{
            gridTemplateColumns: `repeat(${navItemsLength}, minmax(0, 1fr))`,
          }}
        />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
