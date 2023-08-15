import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { data } from "@/constants/data-dev"; // <-- dev

import { productCategories } from "@/config/category";
import { absoluteUrl } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import { Grid } from "@/components/layout/grid";
import { ProductsList } from "@/components/products-list";
import { Shell } from "@/components/shell";

interface StorePageProps {
  params: {
    storeId: string;
  };
}

async function getStore(id: string) {
  const store = data.stores[0]; // <- dev

  if (!store) {
    null;
  }

  return store;
}

export async function generateMetadata({
  params,
}: StorePageProps): Promise<Metadata> {
  const store = await getStore(params.storeId);
  const sanitizedAuthors = data.users.filter(({ id }) => id === store.userId); // <- dev

  if (!store) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", store.name);
  ogUrl.searchParams.set("type", "Listing Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: store.name,
    description: store.description,
    authors: sanitizedAuthors,
    openGraph: {
      title: store.name,
      description: store.description,
      type: "profile",
      url: absoluteUrl(`/store/${store.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: store.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: store.name,
      description: store.description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function StorePage({ params }: StorePageProps) {
  const store = await getStore(params.storeId);

  // dev
  const seller = data.users.find(({ id }) => id === store.userId);
  const storeProducts = data.products.filter(
    ({ storeId }) => storeId === store.id
  );

  if (!store) {
    notFound();
  }

  return (
    <Shell>
      <div className="flex justify-center">
        <div className="grid w-full gap-4">
          <div className="flex w-full flex-col items-center gap-2">
            <AspectRatio ratio={4 / 1} className="w-full">
              {!store.coverImageUrl ? (
                <div className="relative h-full w-full bg-accent"></div>
              ) : (
                <div>
                  <Image
                    src={store.coverImageUrl}
                    alt={store.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <Avatar className="absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2 translate-y-1/2 cursor-pointer border-4 border-background">
                <AvatarImage
                  src={store.profileImageUrl?.toString()}
                  alt={store.name?.toString()}
                />
                <AvatarFallback>
                  {store.name
                    .split(" ")
                    .map((name) => name.charAt(0).toUpperCase())
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </AspectRatio>
            <Heading size="lg" className="mt-11">
              {store.name}
            </Heading>
          </div>
          <div className="mx-auto max-w-sm text-center">
            <p className="text-sm text-foreground/75">{store.description}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Icons.mapPin className="h-4 w-4" />
            <p className="text-sm">Florida, United States</p>
          </div>
          <div className="mx-auto grid w-fit grid-cols-2 gap-6">
            <Button>Follow</Button>
            <Button variant="outline">Messsage</Button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Tabs defaultValue="shop" className="grid gap-6">
          <TabsList className="mx-auto grid w-fit grid-cols-4">
            <TabsTrigger value="shop">Shop</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="shop" className="grid gap-8">
            <Grid>
              <Input placeholder="Seach something in this store..." />
              <div className="hidden lg:block"></div>
              <div className="hidden md:block"></div>
              <Select value={"all"}>
                <SelectTrigger className="capitalize">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      key={"all"}
                      value={"all"}
                      className="capitalize"
                    >
                      all
                    </SelectItem>
                    {productCategories.map(({ title }) => (
                      <SelectItem
                        key={title}
                        value={title}
                        className="capitalize"
                      >
                        {title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Grid>
            {/* </div> */}
            <ProductsList products={storeProducts} />
          </TabsContent>
          <TabsContent value="about" className="flex justify-between gap-8">
            {seller && (
              <div className="flex flex-col gap-8">
                <Heading> About the seller</Heading>

                <div className="flex items-center gap-6">
                  <Avatar className="h-16 w-16 cursor-pointer">
                    <AvatarImage
                      src={seller.image?.toString()}
                      alt={seller.name?.toString()}
                    />
                    <AvatarFallback>
                      {seller.name
                        ?.split(" ")
                        .map((name) => name.charAt(0).toUpperCase())
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Heading size="sm">{seller.name}</Heading>
                </div>
                <p className="text-foreground/75">
                  Hi darlings. Welcome to our family run jewelry business. All
                  our jewelry is enthusiastically designed with a classic
                  artisan style to ensure a personalized quality piece of
                  jewelry you can wear for many years to come. We design all our
                  jewelry with the stylish and sophisticated women in mind who
                  enjoys wearing minimalistic yet meaningful accents.
                </p>
              </div>
            )}
            <Card>
              <CardHeader>
                <div className="flex gap-8">
                  <div>
                    <Heading size="lg">3,500</Heading>
                    <p className="text-foreground/75">Followers</p>
                  </div>
                  <div>
                    <Heading size="lg">3,500</Heading>
                    <p className="text-foreground/75">Following</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="announcements"></TabsContent>
          <TabsContent value="reviews"></TabsContent>
        </Tabs>
      </div>
    </Shell>
  );
}
