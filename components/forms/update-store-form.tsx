"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Store } from "@/db/schema";
import { FileWithPreview, UploadedFile } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { deleteStore, updateStore } from "@/lib/actions/store";
import { cn } from "@/lib/utils";
import {
  StoreSchema,
  storeSchema,
  UpdateStoreSchema,
} from "@/lib/validations/store";
import { useUploadThing } from "@/hooks/use-uploadthing";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StoreForm } from "@/components/forms/store-form";

import { Icons } from "../icons";
import { toast } from "../ui/use-toast";

interface UpdateStoreFormProps {
  store: Store;
}

export function UpdateStoreForm({ store }: UpdateStoreFormProps) {
  const submitId = "store-settings-form";

  function createFileWithPreview(
    storeFile: UploadedFile | null
  ): FileWithPreview | undefined {
    if (!storeFile) {
      return undefined;
    }

    const fileContent = new Blob([], { type: "image/*" });

    const fileWithPreview: FileWithPreview = Object.assign(
      new File([fileContent], storeFile.name, {
        type: "image",
        lastModified: 0,
      }),
      {
        preview: storeFile.url,
        uploaded: {
          key: storeFile.key,
          size: storeFile.size,
          name: storeFile.name,
          url: storeFile.url,
        },
      }
    );

    return fileWithPreview;
  }

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const form = useForm<StoreSchema>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      id: store.id,
      name: store.name,
      description: store.description ?? "",
      contactEmail: store.contactEmail,
      avatar: createFileWithPreview(store.avatar),
      cover: createFileWithPreview(store.cover),
    },
  });

  const { startUpload: startAvatarUpload } = useUploadThing(
    "avatarImageUploader"
  );
  const { startUpload: startCoverUpload } =
    useUploadThing("coverImageUploader");

  async function onSubmit(data: StoreSchema) {
    setIsUpdating(true);
    try {
      const updateData: UpdateStoreSchema = {
        name: data.name,
        description: data.description,
        id: data.id,
        contactEmail: data.contactEmail,
      };

      if (data.avatar && !data.avatar.uploaded) {
        const res = await startAvatarUpload([data.avatar]);
        if (res) {
          updateData.avatar = res[0];
        }
      }
      if (data.cover && !data.cover.uploaded) {
        const res = await startCoverUpload([data.cover]);
        if (res) {
          updateData.cover = res[0];
        }
      }

      await updateStore(updateData, store.id);

      toast({
        description: "Store updated successfully.",
      });

      router.refresh();
    } catch (err) {
      console.error(err);
      toast({
        description: "Your store was not updated. Please try again.",
        variant: "destructive",
      });
    }
    setIsUpdating(false);
  }

  async function onDelete() {
    setIsDeleting(true);
    try {
      await deleteStore(store.id);
      toast({ description: "Store deleted sucessfully." });
    } catch (err) {
      toast({ description: "Something went wrong.", variant: "destructive" });
    }
    setIsDeleting(false);
  }
  return (
    <>
      <StoreForm
        form={form}
        onSubmit={onSubmit}
        submitId={submitId}
        disabled={isDeleting || isUpdating}
      />
      <div className="flex justify-end">
        <div className="grid grid-cols-2 gap-4">
          <Dialog open={dialogOpen || isDeleting} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={isUpdating}>
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Store Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this store? Deleting a store
                  will permanently remove all associated products, customer
                  data, and settings. This action cannot be undone. Please
                  confirm your choice by clicking the &quot;Delete&quot; button
                  below, or click &quot;Cancel&quot; to keep the store intact.
                  Your decision will have irreversible consequences on your
                  business operations and customer information.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 sm:grid-cols-2">
                <Button
                  onClick={() => setDialogOpen(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={onDelete}
                  variant="destructive"
                  disabled={isDeleting}
                >
                  {isDeleting && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <label
            htmlFor={submitId}
            className={cn(buttonVariants(), {
              "pointer-events-none opacity-50": isDeleting || isUpdating,
            })}
          >
            {isUpdating && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save changes
          </label>
        </div>
      </div>
    </>
  );
}
