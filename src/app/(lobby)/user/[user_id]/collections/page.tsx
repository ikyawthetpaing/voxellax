import { Metadata } from "next";
import { Collections } from "@/components/profile/collections";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Collections",
  description: "View and share your collections with your friends and family.",
};

interface UserCollectionsPageProps {
  params: {
    user_id: string;
  };
}

export default async function UserCollectionsPage({
  params,
}: UserCollectionsPageProps) {
  const collections = await db.collection.findMany({
    where: { userId: params.user_id },
  });
  return <Collections collections={collections} />;
}
