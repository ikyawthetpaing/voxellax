import { Collection } from "@/db/schema";

import { CollectionCard } from "@/components/collection-card";
import { Grid } from "@/components/layout/grid";

interface CollectionsListProps {
  collections: Collection[];
}

export function CollectionsList({ collections }: CollectionsListProps) {
  return (
    <Grid>
      {collections.map((collection, index) => (
        <CollectionCard key={index} collection={collection} />
      ))}
    </Grid>
  );
}
