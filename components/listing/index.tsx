import Link from "next/link";

import { Product } from "@/db/schema";

import { getProducts } from "@/lib/actions/product";
import { getStore } from "@/lib/actions/store";
import { getUserAction } from "@/lib/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heading } from "@/components/heading";
import { ProductsList } from "@/components/products-list";

import { Icons } from "../icons";
import { DetailsCard } from "./details-card";
import { ImageGallery } from "./image-gallery";
import { Infos } from "./infos";

export async function Listing({ product }: { product: Product }) {
  const store = await getStore(product.storeId);
  const seller = await getUserAction(store?.userId || "");

  const { items: products } = await getProducts({
    limit: 4,
    offset: 0,
    store_ids: product.storeId,
  });

  if (!store || !seller) {
    return null;
  }

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
          <ImageGallery images={product.images} productId={product.id} />
          {/* {reviews.length > 0 && (
            <Reviews reviews={reviews} className="hidden lg:grid" />
          )} */}
        </div>
        <div className="flex flex-col gap-8">
          <DetailsCard className="lg:w-96" product={product} />
          <Infos
            className="lg:w-96"
            description={product.description || ""}
            store={store}
            seller={seller}
          />
          {/* {product.reviews && <Reviews reviews={product.reviews} className="lg:hidden"/>} */}
        </div>
      </div>
      <div className="space-y-4">
        <Heading>You may also like</Heading>
        <ProductsList products={products} />
      </div>
    </div>
  );
}
