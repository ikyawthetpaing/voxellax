"use client";

import { ButtonHTMLAttributes, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserCollections } from "@/context/user-collections";
import { Collection } from "@/db/schema";
import { ProductImageUploadedFile } from "@/types";

import {
  getCollectionProduct,
  getCollectionThumbnails,
  toggleCollectionProduct,
} from "@/lib/actions/collections";
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
import { toast } from "@/components/ui/use-toast";
import { CreateCollectionForm } from "@/components/forms/create-collection-form";
import { Icons } from "@/components/icons";

interface AddToCollectionDialogProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  productId: string;
}

export function AddToCollectionDialog({
  productId,
  className,
}: AddToCollectionDialogProps) {
  // State variables to manage component behavior
  const { collections } = useUserCollections();
  const [isCollectionCreating, setIsCollectionCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    // The component's UI is composed using various child components
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          aria-label="Add to collection"
          className={className}
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
        {/* Conditionally render either the create collection form or the list of existing collections */}
        {isCollectionCreating ? (
          <div className="px-6">
            <CreateCollectionForm setCreating={setIsCollectionCreating} />
          </div>
        ) : (
          <ScrollArea className="px-6">
            <div className="grid max-h-96 gap-4">
              {isLoading ? (
                // Display skeleton placeholders while loading collections
                Array.from({ length: 4 }, (_, i) => i).map((index) => (
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
                <div className="flex items-center justify-center">
                  no collection
                </div>
              ) : (
                // Display existing collections
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
          // Display a button to create a new collection
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
  const [isAdding, setIsAdding] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(false);
  const [thumbnail, setThumbnail] = useState<ProductImageUploadedFile | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Use the refactored function in the useEffect hook
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const thumbnailData = await getCollectionThumbnails(collection.id, 1);
      const added = await getCollectionProduct(collection.id, productId);
      setThumbnail(thumbnailData[0]);
      setIsProductAdded(!!added);
      setIsLoading(false);
    }
    fetchData();
  }, [collection.id, productId]);

  async function toggleProduct() {
    setIsAdding(true);
    try {
      await toggleCollectionProduct(collection.id, productId);
    } catch (error) {
      console.error(error);
      return toast({
        title: "Something went wrong.",
        description: "Your collection was not added. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
      router.refresh();
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-24">
          <AspectRatio ratio={4 / 3}>
            {/* Display an image with a placeholder URL */}
            <Link
              href={`/user/${collection.userId}/collections/${collection.id}`}
            >
              {isLoading ? (
                <Skeleton className="h-full w-full" />
              ) : thumbnail ? (
                <Image
                  src={thumbnail.url}
                  alt={collection.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full bg-accent"></div>
              )}
            </Link>
          </AspectRatio>
        </div>
        <div>
          {/* Display the collection name */}
          <Link
            href={`/user/${collection.userId}/collections/${collection.id}`}
          >
            <h1 className="line-clamp-1 font-medium">{collection.name}</h1>
          </Link>
        </div>
      </div>
      <div>
        {/* Display a bookmark icon */}
        <Button
          size="icon"
          variant={isProductAdded ? "secondary" : "ghost"}
          onClick={toggleProduct}
          disabled={isAdding}
        >
          {isAdding || isLoading ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.bookmark className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
