import { data as devData } from "@/constants/data-dev";

import { Product } from "@/types/dev";
import { Grid } from "@/components/layout/grid";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";

interface ProductsListProps {
  products: Product[];
}

export async function ProductsList({ products }: ProductsListProps) {
  if (!products) {
    return null;
  }

  const data = devData.products.map((product) => {
    const store = devData.stores.find(({ id }) => id === product.storeId);
    // const license = devData.licenses.find(
    //   ({ productId }) => productId === product.id
    // );
    // const price = license?.price ?? 0;
    const price = product.price;
    return {
      store: { id: store?.id ?? "", name: store?.name ?? "" },
      product,
      price,
      thumbnail: null,
    };
  });

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

export function ProductsListSkeleton() {
  return (
    <Grid>
      {Array.from({ length: 8 }, (_, i) => i).map((index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </Grid>
  );
}
