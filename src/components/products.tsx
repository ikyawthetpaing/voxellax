import { ProductCard } from "@/components/product-card";
import { ProductCardSkeleton } from "@/components/product-card";
import { Grid } from "@/components/layout/grid";
import { Product } from "@prisma/client";
import { db } from "@/lib/db";

interface ProductsProps {
  products: Product[];
}

export async function Products({ products }: ProductsProps) {
  if (!products) {
    return null;
  }

  const data = await Promise.all(
    products.map(async ({ id, storeId, category, name }) => {
      const product = {
        id,
        name,
        category,
        storeId,
      };

      const store = await db.store.findFirst({
        where: { id: storeId ?? "" },
        select: { id: true, name: true },
      });
      if (!store) {
        return null;
      }

      const license = await db.license.findFirst({
        where: { productId: id },
        select: { price: true },
      });

      const thumbnail = await db.file.findFirst({
        where: { productImagesId: id, isThumbnail: true },
        select: { url: true },
      });

      const price = license?.price || 0;

      return {
        product,
        store,
        price,
        thumbnail,
      };
    })
  );

  return (
    <Grid>
      {data.map((data, index) => {
        if (!data) {
          return null;
        }

        const { product, store, price, thumbnail } = data;
        return (
          <ProductCard
            key={index}
            product={product}
            store={store}
            price={price}
            thumbnail={thumbnail}
          />
        );
      })}
    </Grid>
  );
}

export function ProductsSkeleton() {
  return (
    <Grid>
      {Array.from({ length: 8 }, (_, i) => i).map((index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </Grid>
  );
}
