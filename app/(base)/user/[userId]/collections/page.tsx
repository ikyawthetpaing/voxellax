import { Metadata } from "next";

import { Collection } from "@/db/schema";

import { getUserCollections } from "@/lib/actions/collections";
import { getSession } from "@/lib/session";
import { CollectionsList } from "@/components/collections-list";
import { Icons } from "@/components/icons";

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
    return (
      <div>
        <div className="mt-14 flex flex-col items-center">
          <Icons.bookmark
            className="mb-4 h-16 w-16 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-xl font-medium text-muted-foreground">
            No collections yet
          </p>
        </div>
      </div>
    );
  }

  if (!isCurrentUser) {
    collections.filter(({ privacy }) => privacy === "public");
  }

  return <CollectionsList collections={collections} />;
}
