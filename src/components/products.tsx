import { ProductCard } from "@/components/product-card";

// for dev
import data from "@/helpers/data.json";

export function Products() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}
