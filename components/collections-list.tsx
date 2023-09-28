import { Collection } from "@/db/schema";

import {
  CollectionCard,
  CollectionCardSkeleton,
} from "@/components/collection-card";
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

export function CollectionsListSkeleton() {
  return (
    <Grid>
      {Array.from({ length: 4 }, (_, i) => i).map((index) => (
        <CollectionCardSkeleton key={index} />
      ))}
    </Grid>
  );
}
