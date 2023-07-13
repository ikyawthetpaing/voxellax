import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { UpdateStoreForm } from "@/components/form/update-store-form";

export const metadata: Metadata = {
  title: "Manage Store",
  description: "Manage your store",
};

interface UpdateStorePageProps {
  params: {
    store_id: string;
  };
}

export default async function UpdateStorePage({
  params,
}: UpdateStorePageProps) {
  const store_id = params.store_id;

  const store = await db.store.findFirst({
    where: {
      id: store_id,
    },
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  if (!store) {
    notFound();
  }

  return (
    <div>
      {store && (
        <UpdateStoreForm
          storeId={store.id}
          storeName={store.name}
          storeDescription={store.description}
        />
      )}
    </div>
  );
}
