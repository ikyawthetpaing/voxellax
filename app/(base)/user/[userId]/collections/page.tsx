import { Metadata } from "next";

import { Collection } from "@/db/schema";

import { getUserCollections } from "@/lib/actions/collections";
import { CollectionsList } from "@/components/collections-list";

export const metadata: Metadata = {
  title: "Collections",
  description: "View and share the collections with your friends and family.",
};

interface UserCollectionsPageProps {
  params: {
    userId: string;
  };
}

export default async function UserCollectionsPage({
  params,
}: UserCollectionsPageProps) {
  const collections: Collection[] = await getUserCollections(params.userId);

  return <CollectionsList collections={collections} />;
}
