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
  return (
    <Grid>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}
