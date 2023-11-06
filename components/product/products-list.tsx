import { Product } from "@/db/schema";

import { Grid } from "@/components/layout/grid";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/components/product/product-card";

interface ProductsListProps {
  products: Product[];
}

export async function ProductsList({ products }: ProductsListProps) {
  if (!products.length) {
    return null;
  }

  return (
    <Grid>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}

export function ProductsListSkeleton() {
  return (
    <Grid>
      {Array.from({ length: 4 }, (_, i) => i).map((index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </Grid>
  );
}
