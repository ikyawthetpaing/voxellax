import { Collections } from "@/components/profile/collections";

import data from "@/helpers/data.json"; // <- dev
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
  description: "View and share your collections with your friends and family.",
};

export default function UserCollectionsPage() {
  return (
    <Collections collections={data.collections}/>
  );
}