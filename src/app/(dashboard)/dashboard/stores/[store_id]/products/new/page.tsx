import { env } from "@/env.mjs";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddProductForm } from "@/components/form/add-product-form";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "New Product",
  description: "Add a new product",
};

interface NewProductPageProps {
  params: {
    store_id: string;
  };
}

export default async function NewProductPage({ params }: NewProductPageProps) {
  const store_id = params.store_id;

  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Add product</CardTitle>
        <CardDescription>Add a new product to your store</CardDescription>
      </CardHeader>
      <CardContent>
        <AddProductForm storeId={store_id} />
      </CardContent>
    </Card>
  );
}
