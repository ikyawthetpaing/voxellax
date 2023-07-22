import { DetailsCard } from "./details-card";
import { ImageGallery } from "./image-gallery";
import { Infos } from "./infos";
import { Reviews } from "./reviews";
import { Product } from "@prisma/client";
import { db } from "@/lib/db";
import { Heading } from "../ui/heading";

export async function Listing({ product }: { product: Product }) {
  const reviews = await db.review.findMany({
    where: { productId: product.id },
  });
  const images = await db.file.findMany({ where: { productImagesId: product.id }, orderBy: {index: "asc"} });
  const licenses = await db.license.findMany({
    where: { productId: product.id },
  });
  const store = await db.store.findFirst({
    where: { id: product.storeId || undefined },
  });
  const seller = await db.user.findFirst({
    where: { id: store?.userId || undefined },
  });

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
          <ImageGallery images={images} />
          {reviews.length > 0 && (
            <Reviews reviews={reviews} className="hidden lg:grid" />
          )}
        </div>
        <div className="flex flex-col gap-8">
          <DetailsCard
            className="lg:w-96"
            title={product.name}
            category={product.category}
            subCategory={product.subcategory}
            licenses={licenses}
            totalReviews={totalReviews}
            averageRates={getAverageRates()}
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
        {/* <Products products={data.products} /> */}
      </div>
      {reviews.length > 0 && (
        <Reviews reviews={reviews} className="lg:hidden" />
      )}
    </div>
  );
}
