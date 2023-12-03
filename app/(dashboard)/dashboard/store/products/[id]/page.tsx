import { notFound } from "next/navigation";

import { getProduct } from "@/lib/actions/product";
import { UpdateProductForm } from "@/components/forms/update-product-form";
import { Shell } from "@/components/shell";

interface Props {
  params: {
    id: string;
  };
}

export default async function UpdateProductPage({ params }: Props) {
  const product = await getProduct(params.id);
  if (!product) notFound();
  return (
    <Shell layout="dashboard">
      <div className="mx-auto w-full max-w-3xl">
        <UpdateProductForm product={product} />
      </div>
    </Shell>
  );
}
