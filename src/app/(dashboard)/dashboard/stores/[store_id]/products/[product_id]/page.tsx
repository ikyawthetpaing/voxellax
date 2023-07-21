// import { db } from "@/db"
// import { products } from "@/db/schema"
import { env } from "@/env.mjs";
// import { and, eq } from "drizzle-orm"
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { UpdateProductForm } from "@/components/form/update-product-form";
// import { ProductPager } from "@/components/pagers/product-pager";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Manage Product",
  description: "Manage your product",
};

interface UpdateProductPageProps {
  params: {
    store_id: string
    product_id: string;
  };
}

export default async function UpdateProductPage({
  params,
}: UpdateProductPageProps) {
  const product = await db.product.findFirst({
    where: { id: params.product_id }
  });
  
  if (!product) {
    notFound();
  }
  
  const licenses = await db.license.findMany({where: {productId: product?.id}});
  const images = await db.file.findMany({where: {productImagesId: product.id}, orderBy: {index: "asc"}});

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between space-x-2">
          <CardTitle className="text-2xl">Update product</CardTitle>
          {/* <ProductPager product={product} /> */}
        </div>
        <CardDescription>
          Update your product information, or delete it
        </CardDescription>
      </CardHeader>
      <CardContent className="max-w-xl">
        <UpdateProductForm storeId={params.store_id} product={product} licenses={licenses} images={images}/>
      </CardContent>
    </Card>
  );
}
