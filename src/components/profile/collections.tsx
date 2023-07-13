import { Collection } from "@/types";
import { Grid } from "@/components/layout/grid";
import {
  CollectionCard,
  CollectionCardSkeleton,
} from "@/components/profile/collection-card";

interface CollectionsProps {
  collections: Collection[];
}

export function Collections({ collections }: CollectionsProps) {
  return (
    <Grid>
      {collections.map((collection, index) => (
        <CollectionCard key={index} collection={collection} />
      ))}
    </Grid>
  );
}

export function CollectionsSkeleton() {
  return (
    <Grid>
      {Array.from({ length: 8 }, (_, i) => i).map((index) => (
        <CollectionCardSkeleton />
      ))}
    </Grid>
  );
}
