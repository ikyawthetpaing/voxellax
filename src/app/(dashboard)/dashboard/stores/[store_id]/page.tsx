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
      profileImageUrl: true,
      coverImageUrl: true,
    },
  });

  if (!store) {
    notFound();
  }

  const profileImage = await db.file.findFirst({
    where: { url: store.profileImageUrl ?? "" },
  });
  const coverImage = await db.file.findFirst({
    where: { url: store.coverImageUrl ?? "" },
  });

  return (
    <div>
      {store && (
        <UpdateStoreForm
          store={store}
          profileImage={profileImage}
          coverImage={coverImage}
        />
      )}
    </div>
  );
}
