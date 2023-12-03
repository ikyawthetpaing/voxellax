import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { baseConfig } from "@/config/base";
import { siteConfig } from "@/config/site";

import { getStoreByHandle } from "@/lib/actions/store";
import { getUser } from "@/lib/actions/user";
import { absoluteUrl } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import { Tabs } from "@/components/tabs";

interface StoreLayoutPageProps {
  params: {
    handle: string;
  };
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: StoreLayoutPageProps): Promise<Metadata> {
  const store = await getStoreByHandle(params.handle);

  if (!store) {
    return {};
  }

  const user = await getUser(store.userId);
  const sanitizedAuthors = user
    ? [{ name: user.name ?? "Unknown", url: absoluteUrl(`/user/${user.id}`) }]
    : [];

  const ogUrl = new URL(store.avatar ? store.avatar.url : siteConfig.ogImage);
  ogUrl.searchParams.set("heading", store.name);
  ogUrl.searchParams.set("type", "Listing Post");
  ogUrl.searchParams.set("mode", "dark");

  const description = store.description
    ? store.description
    : `Check out ${store.name} on ${siteConfig.name}`;

  return {
    title: store.name,
    description: description,
    authors: sanitizedAuthors,
    openGraph: {
      title: store.name,
      description: description,
      type: "profile",
      url: absoluteUrl(`/store/${store.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1080,
          height: 1080,
          alt: store.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: store.name,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function StoreLayoutPage({
  params,
  children,
}: StoreLayoutPageProps) {
  const store = await getStoreByHandle(params.handle);

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
              {store.avatar ? (
                <Image
                  src={store.avatar.url}
                  alt={store.avatar.name}
                  fill
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Icons.store className="h-1/3 w-1/3 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container mt-16 grid gap-4 sm:mt-24">
          <div>
            <Heading className="flex items-center gap-2">
              {store.name}
              {store.verified && (
                <Icons.verified className="h-5 w-5 text-blue-500" />
              )}
            </Heading>
            <p className="text-muted-foreground">@{store.id}</p>
          </div>
          {store.description && (
            <div className="max-w-lg">
              <p className="text-foreground/75">{store.description}</p>
            </div>
          )}
          <div className="grid w-fit grid-cols-2 gap-6">
            <Button size="sm">Follow</Button>
            <Button size="sm" variant="outline">
              Messsage
            </Button>
          </div>
        </div>
      </div>
      <div className="container mt-6">
        <Tabs
          navItems={navItems}
          style={{
            gridTemplateColumns: `repeat(${navItemsLength}, minmax(0, 1fr))`,
          }}
        />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
