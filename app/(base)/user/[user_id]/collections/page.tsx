import { Metadata } from "next";

import { Collection } from "@/db/schema";

import { getUserCollections } from "@/lib/actions/collections";
import { getSession } from "@/lib/session";
import { CollectionsList } from "@/components/collections-list";
import { Empty } from "@/components/empty";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Discover, curate, and share collections with friends and family. Collaborate on your favorite collections and explore a world of creativity and inspiration.",
};

interface Props {
  params: {
    user_id: string;
  };
}

export default async function UserCollectionsPage({ params }: Props) {
  const collections: Collection[] = await getUserCollections(params.user_id);
  const session = await getSession();
  const isCurrentUser = session?.user.id === params.user_id;

  if (!collections.length) {
    return <Empty icon="bookmark" message="No collections yet" />;
  }

  if (!isCurrentUser) {
    collections.filter(({ privacy }) => privacy === "public");
  }

  return <CollectionsList collections={collections} />;
}
