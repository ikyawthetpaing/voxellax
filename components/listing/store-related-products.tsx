import { getProducts } from "@/lib/actions/product";
import { Heading } from "@/components/heading";
import { ProductsList } from "@/components/product/products-list";

export async function StoreRelatedProducts({
  storeId,
  excludes,
}: {
  storeId: string;
  excludes: string[];
}) {
  const { items: products } = await getProducts({
    limit: 4,
    offset: 0,
    store_ids: storeId,
    excludes: excludes,
  });

  if (!products.length) return null;

  return (
    <div className="space-y-4">
      <Heading>You may also like</Heading>
      <ProductsList products={products} />
    </div>
  );
}
