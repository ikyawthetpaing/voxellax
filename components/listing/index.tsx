import Link from "next/link";

import { Product } from "@/db/schema";

import { getProducts } from "@/lib/actions/product";
import { getStore } from "@/lib/actions/store";
import { getUser } from "@/lib/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import { ProductsList } from "@/components/product/products-list";

import { DetailsCard } from "./details-card";
import { ImageGallery } from "./image-gallery";
import { Infos } from "./infos";
import { Reviews } from "./reviews";

// still in development hardcoded
export type Review = {
  message: string;
  rate: 1 | 2 | 3 | 4 | 5;
  name: string;
  createdAt: Date;
};

const reviews: Review[] = [
  {
    message: "Great product!",
    rate: 5,
    name: "John Doe",
    createdAt: new Date("2023-09-29T10:00:00Z"),
  },
  {
    message: "Good quality.",
    rate: 4,
    name: "Jane Smith",
    createdAt: new Date("2023-09-29T09:30:00Z"),
  },
  {
    message: "Could be better.",
    rate: 3,
    name: "Alice Johnson",
    createdAt: new Date("2023-09-28T15:45:00Z"),
  },
  {
    message: "Not satisfied.",
    rate: 2,
    name: "Bob Brown",
    createdAt: new Date("2023-09-28T14:20:00Z"),
  },
  {
    message: "Terrible experience!",
    rate: 1,
    name: "Eve Wilson",
    createdAt: new Date("2023-09-27T20:15:00Z"),
  },
];

export async function Listing({ product }: { product: Product }) {
  const store = await getStore(product.storeId);
  const seller = await getUser(store?.userId || "");

  const { items: products } = await getProducts({
    limit: 4,
    offset: 0,
    store_ids: product.storeId,
  });

  if (!store || !seller) {
    return null;
  }

  // dev
  const totalRates = reviews.reduce((sum, review) => sum + review.rate, 0);
  const averageRate = totalRates / reviews.length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Heading className="line-clamp-2">{product.name}</Heading>
        <Link href={`/store/${store.id}`}>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={store.avatar?.url} alt={store.avatar?.name} />
              <AvatarFallback>{store.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="flex items-center gap-2">
              {store.name}
              {store.verified && (
                <Icons.verified className="h-4 w-4 text-blue-500" />
              )}
            </h2>
          </div>
        </Link>
      </div>
      <div className="grid gap-8 lg:flex">
        <div className="flex flex-1 flex-col gap-8">
          <ImageGallery product={product} />
          <Reviews reviews={reviews} className="hidden lg:grid" />
        </div>
        <div className="flex flex-col gap-8">
          <DetailsCard
            className="lg:w-96"
            product={product}
            averageRate={averageRate}
            totalReviews={reviews.length}
          />
          <div>
            <Infos
              className="lg:w-96"
              product={product}
              store={store}
              seller={seller}
            />
            <Reviews reviews={reviews} className="lg:hidden" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Heading>You may also like</Heading>
        <ProductsList products={products} />
      </div>
    </div>
  );
}
