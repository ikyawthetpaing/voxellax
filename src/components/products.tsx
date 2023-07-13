import { ProductCard } from "@/components/product-card";
import { ProductCardSkeleton } from "@/components/product-card";
import { Grid } from "@/components/layout/grid";
import { Product } from "@prisma/client";

interface ProductsProps {
  products: Product[];
}

export function Products({ products }: ProductsProps) {
  if (!products) {
    return null;
  }

  return (
    <Grid>
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
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
