import { data } from "@/constants/data-dev";

import { Product } from "@/types/dev";
import { Heading } from "@/components/heading";
import { ProductsList } from "@/components/products-list";

import { DetailsCard } from "./details-card";
import { ImageGallery } from "./image-gallery";
import { Infos } from "./infos";
import { Reviews } from "./reviews";

// import { Product } from "@prisma/client";
// import { db } from "@/lib/db";
// import { Heading } from "../ui/heading";

export async function Listing({ product }: { product: Product }) {
  // const reviews = await db.review.findMany({
  //   where: { productId: product.id },
  // });
  // const images = await db.file.findMany({
  //   where: { productImagesId: product.id },
  //   orderBy: { index: "asc" },
  // });
  // const licenses = await db.license.findMany({
  //   where: { productId: product.id },
  // });
  // const store = await db.store.findFirst({
  //   where: { id: product.storeId || undefined },
  // });
  // const seller = await db.user.findFirst({
  //   where: { id: store?.userId || undefined },
  // });

  const reviews = data.reviews.filter(
    ({ productId }) => productId === product.id
  );
  const images: string[] = [];
  // const licenses = data.licenses.filter(
  //   ({ productId }) => productId === product.id
  // );
  const store = data.stores.find(({ id }) => id === product.storeId);
  const seller = data.users.find(({ id }) => id === store?.userId);

  const totalReviews = reviews.length;
  const getAverageRates = () => {
    if (totalReviews === 0) {
      return 0;
    }

    const total = reviews.reduce(
      (accumulator, { rate }) => accumulator + rate,
      0
    );

    return total / totalReviews;
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 lg:flex">
        <div className="flex flex-1 flex-col gap-8">
          {/* Image and gallery code */}
          <ImageGallery images={images} productId={product.id} />
          {reviews.length > 0 && (
            // <Reviews reviews={reviews} className="hidden lg:grid" />
            <Reviews />
          )}
        </div>
        <div className="flex flex-col gap-8">
          <DetailsCard
            className="lg:w-96"
            title={product.name}
            category={product.category}
            subCategory={product.subcategory}
            price={product.price}
            // licenses={licenses}
            totalReviews={totalReviews}
            averageRates={getAverageRates()}
            productId={product.id}
          />
          <Infos
            className="lg:w-96"
            description={product.description}
            store={store}
            seller={seller}
          />
          {/* {store && seller && <Infos className="lg:w-96" description={product.description} store={store} seller={seller}/>} */}

          {/* {product.reviews && <Reviews reviews={product.reviews} className="lg:hidden"/>} */}
        </div>
      </div>
      <div className="space-y-4">
        <Heading>You may also like</Heading>
        <ProductsList products={data.products} />
      </div>
      {reviews.length > 0 && (
        // <Reviews reviews={reviews} className="lg:hidden" />
        <Reviews />
      )}
    </div>
  );
}
