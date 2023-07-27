"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ScrollArea } from "./ui/scroll-area";
import { CreateCollectionForm } from "./form/create-collection-form";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Collection, CollectionProduct, File } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { CollectionPatchSchema } from "@/types/validations/collection";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

interface AddToCollectionDialogProps {
  productId: string;
}

export function AddToCollectionDialog({
  productId,
}: AddToCollectionDialogProps) {
  // State variables to manage component behavior
  const [isCollectionCreating, setIsCollectionCreating] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch collections data from an API endpoint on component mount
  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/collections`, { method: "GET" })
      .then((res) => res.json())
      .then((json: Collection[]) => {
        setCollections(json);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // The component's UI is composed using various child components
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="hidden rounded-full sm:inline-flex"
          aria-label="Add to collection"
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
  const [thumbnail, setThumbnail] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Function to fetch product data from the API
  const fetchProductData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Function to fetch thumbnail data for the first product in the collection
  const fetchThumbnailData = async (productId: string) => {
    const thumbnailUrl = `/api/products/${productId}/thumbnail`;
    return (await fetchProductData(thumbnailUrl)) as File;
  };

  // Function to fetch collections data from an API endpoint on component mount
  const fetchCollectionData = async (
    collectionId: string,
    productId: string
  ) => {
    setIsLoading(true);

    try {
      const collectionProductsUrl = `/api/collections/${collectionId}/products`;
      const collectionProducts = (await fetchProductData(
        collectionProductsUrl
      )) as CollectionProduct[];

      const productInCollection = collectionProducts.find(
        (product) => product.productId === productId
      );
      setIsProductAdded(!!productInCollection);

      if (collectionProducts.length) {
        const firstProduct = collectionProducts[0];
        const thumbnailData = await fetchThumbnailData(firstProduct.productId);
        setThumbnail(thumbnailData);
      }
    } catch (error) {
      // Handle errors
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use the refactored function in the useEffect hook
  useEffect(() => {
    fetchCollectionData(collection.id, productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function toggleCollectionProduct() {
    setIsAdding(true);
    try {
      const data: CollectionPatchSchema = {
        productId,
      };

      const res = await fetch(`/api/collections/${collection.id}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 403) {
          router.push("/login");
        } else {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
            duration: 5000,
          });
        }
      }
    } catch (error) {
      console.error(error);
      return toast({
        title: "Something went wrong.",
        description: "Your collection was not added. Please try again.",
        variant: "destructive",
      });
    }
    router.refresh();
    setIsAdding(false);
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
              ) : (
                <Image
                  src={thumbnail?.url || siteConfig.placeholderImageUrl}
                  alt={collection.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
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
          onClick={toggleCollectionProduct}
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
