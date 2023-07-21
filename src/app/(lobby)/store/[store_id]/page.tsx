import { notFound } from "next/navigation";
import { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { Shell } from "@/components/shell";
import { db } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Products } from "@/components/products";
import { Input } from "@/components/ui/input";
import { productCategories } from "@/config/category";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Grid } from "@/components/layout/grid";

interface StorePageProps {
  params: {
    store_id: string;
  };
}

async function getStore(id: string) {
  const store = db.store.findFirst({
    where: {
      id: id,
    },
  });

  if (!store) {
    null;
  }

  return store;
}

export async function generateMetadata({
  params,
}: StorePageProps): Promise<Metadata> {
  const store = await getStore(params.store_id);
  const authors = await db.user.findMany({
    where: { id: store?.userId ?? undefined },
    select: { name: true },
  });
  const sanitizedAuthors = authors.map((author) => ({
    name: author.name || undefined,
  }));

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
  const store = await getStore(params.store_id);
  const seller = await db.user.findFirst({
    where: { id: store?.userId ?? undefined },
    select: { id: true, image: true, name: true },
  });
  const storeProducts = await db.product.findMany({
    where: { storeId: store?.id },
  });
  if (!store) {
    notFound();
  }

  return (
    <Shell>
      <div className="flex justify-center">
        <div className="grid gap-6 w-full">
          <div className="flex flex-col items-center gap-2 w-full">
            <AspectRatio ratio={4 / 1} className="w-full">
              <div className="w-full h-full bg-accent relative">
                <Avatar className="cursor-pointer w-24 h-24 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 border-4 border-background">
                  <AvatarImage
                    // src={store.image?.toString()}
                    alt={store.name?.toString()}
                  />
                  <AvatarFallback>
                    {store.name
                      .split(" ")
                      .map((name) => name.charAt(0).toUpperCase())
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </AspectRatio>
            <Heading size="lg" className="mt-11">
              {store.name}
            </Heading>
          </div>
          <div className="max-w-sm mx-auto text-center">
            <p className="text-sm text-foreground/75">{store.description}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Icons.mapPin className="w-4 h-4" />
            <p className="text-sm">Florida, United States</p>
          </div>
          <div className="grid grid-cols-2 gap-6 w-fit mx-auto">
            <Button>Follow</Button>
            <Button variant="outline">Messsage</Button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Tabs defaultValue="shop" className="grid gap-6">
          <TabsList className="grid w-fit grid-cols-4 mx-auto">
            <TabsTrigger value="shop">Shop</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="shop" className="grid gap-8">
            {/* <div className="flex justify-between gap-8"> */}
              {/* <Input placeholder="Seach something in this store..." />
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
              </Select> */}
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
            <Products products={storeProducts} />
          </TabsContent>
          <TabsContent value="about" className="flex justify-between gap-8">
            {seller && (
              <div className="flex flex-col gap-8">
                <Heading> About the seller</Heading>

                <div className="flex gap-6 items-center">
                  <Avatar className="cursor-pointer w-16 h-16">
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
                  {/* <<h1 className="text-xl font-medium capitalize"></h1>> */}
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
              {/* <CardContent></CardContent> */}
              {/* <CardFooter className="grid grid-cols-2 gap-8">
              </CardFooter> */}
            </Card>
          </TabsContent>
          <TabsContent value="announcements"></TabsContent>
          <TabsContent value="reviews"></TabsContent>
        </Tabs>
      </div>
    </Shell>
  );
}
