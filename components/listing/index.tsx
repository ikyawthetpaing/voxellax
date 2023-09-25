import { Product } from "@/db/schema";

import { getProducts } from "@/lib/actions/product";
import { getStore } from "@/lib/actions/store";
import { getUserAction } from "@/lib/actions/user";
import { Heading } from "@/components/heading";
import { ProductsList } from "@/components/products-list";

import { DetailsCard } from "./details-card";
import { ImageGallery } from "./image-gallery";
import { Infos } from "./infos";

export async function Listing({ product }: { product: Product }) {
  const store = await getStore(product.storeId);
  const seller = await getUserAction(store?.userId || "");

  const products = await getProducts({
    limit: 4,
    offset: 0,
    store_ids: product.storeId,
  });

  return (
    <div className="flex flex-col gap-8">
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
          {/* {store && seller && <Infos className="lg:w-96" description={product.description} store={store} seller={seller}/>} */}

          {/* {product.reviews && <Reviews reviews={product.reviews} className="lg:hidden"/>} */}
        </div>
      </div>
      <div className="space-y-4">
        <Heading>You may also like</Heading>
        <ProductsList products={products} />
      </div>
      {/* {reviews.length > 0 && (
        <Reviews reviews={reviews} className="lg:hidden" />
      )} */}
    </div>
  );
}
