import { Metadata } from "next";
import { data } from "@/constants/data-dev";

import { Collection } from "@/types/dev";
import { CollectionsList } from "@/components/collections-list";

export const metadata: Metadata = {
  title: "Collections",
  description: "View and share your collections with your friends and family.",
};

interface UserCollectionsPageProps {
  params: {
    userId: string;
  };
}

export default async function UserCollectionsPage({
  params,
}: UserCollectionsPageProps) {
  const collections: Collection[] = data.collections.filter(
    ({ userId }) => userId === params.userId
  );

  return <CollectionsList collections={collections} />;
}
