import { Metadata } from "next";

import { Collection } from "@/db/schema";

import { getUserCollections } from "@/lib/actions/collections";
import { getSession } from "@/lib/session";
import { CollectionsList } from "@/components/collections-list";
import { Empty } from "@/components/empty";

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
  const session = await getSession();
  const isCurrentUser = session?.user.id === params.userId;

  if (!collections.length) {
    return <Empty icon="bookmark" message="No collections yet" />;
  }

  if (!isCurrentUser) {
    collections.filter(({ privacy }) => privacy === "public");
  }

  return <CollectionsList collections={collections} />;
}
