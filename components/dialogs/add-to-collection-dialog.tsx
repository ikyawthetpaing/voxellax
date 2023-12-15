"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";

import { Collection } from "@/db/schema";

import {
  getCollectionProduct,
  toggleCollectionProduct,
} from "@/lib/actions/collections";
import { useUserCollections } from "@/context/user-collections";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty } from "@/components/empty";
import { CreateCollectionForm } from "@/components/forms/create-collection-form";
import { Icons } from "@/components/icons";

interface AddToCollectionDialogProps {
  productId: string;
}

export function AddToCollectionDialog({
  productId,
}: AddToCollectionDialogProps) {
  const { collections, loading } = useUserCollections();
  const [isCollectionCreating, setIsCollectionCreating] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Add to collection"
          className="rounded-full"
        >
          <Icons.bookmark className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-6 px-0 sm:max-w-[425px]">
        <DialogHeader className="px-6">
          <DialogTitle>Add to collections</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {isCollectionCreating ? (
          <div className="px-6">
            <CreateCollectionForm setCreating={setIsCollectionCreating} />
          </div>
        ) : (
          <ScrollArea className="px-6">
            <div className="grid max-h-96 gap-4">
              {loading ? (
                Array.from({ length: 3 }, (_, i) => i).map((index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-24">
                        <AspectRatio ratio={4 / 3}>
                          <Skeleton className="h-full w-full" />
                        </AspectRatio>
                      </div>
                      <Skeleton className="h-6 w-24" />
                    </div>
                    <Skeleton className="h-9 w-9" />
                  </div>
                ))
              ) : !collections.length ? (
                <Empty icon="bookmark" message="No collections yet" />
              ) : (
                collections.map((collection) => (
                  <CollectionCard
                    key={collection.id}
                    collection={collection}
                    productId={productId}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        )}
        {!isCollectionCreating && (
          <div className="grid px-6">
            <Button
              variant="outline"
              onClick={() => setIsCollectionCreating(true)}
            >
              <span>Create new collection</span>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface CollectionCardProps {
  collection: Collection;
  productId: string;
}

function CollectionCard({ collection, productId }: CollectionCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const collectionProduct = await getCollectionProduct(
        collection.id,
        productId
      );
      setIsAdded(!!collectionProduct);
    });
  }, [collection.id, productId]);

  const toggleProduct = () => {
    startTransition(async () => {
      const res = await toggleCollectionProduct(collection.id, productId);
      setIsAdded(res.added);
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-muted">
          <Icons.shapes className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <Link
            href={`/user/${collection.userId}/collections/${collection.id}`}
          >
            <h1 className="line-clamp-1 font-medium">{collection.name}</h1>
          </Link>
        </div>
      </div>
      <div>
        <Button
          size="icon"
          variant={isAdded ? "secondary" : "ghost"}
          onClick={toggleProduct}
          disabled={isPending}
        >
          {isPending ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.bookmark className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
