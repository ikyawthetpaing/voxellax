"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addStore } from "@/lib/actions/store";
import { catchError, cn } from "@/lib/utils";
import {
  AddStoreSchema,
  StoreSchema,
  storeSchema,
} from "@/lib/validations/store";
import { useUploadThing } from "@/hooks/uploadthing";
import { buttonVariants } from "@/components/ui/button";
import { StoreForm } from "@/components/forms/store-form";
import { Icons } from "@/components/icons";

export function AddStoreForm() {
  const submitId = "create-store-form";

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<StoreSchema>({
    resolver: zodResolver(storeSchema),
  });

  const { startUpload: startAvatarUpload } = useUploadThing(
    "avatarImageUploader"
  );
  const { startUpload: startCoverUpload } =
    useUploadThing("coverImageUploader");

  async function onSubmit(data: StoreSchema) {
    startTransition(async () => {
      try {
        const postData: AddStoreSchema = {
          handle: data.handle,
          name: data.name,
          description: data.description,
          contactEmail: data.contactEmail,
        };

        if (data.avatar) {
          const res = await startAvatarUpload([data.avatar]);
          if (res) {
            postData.avatar = res[0];
          }
        }

        if (data.cover) {
          const res = await startCoverUpload([data.cover]);
          if (res) {
            postData.cover = res[0];
          }
        }

        await addStore(postData);

        router.refresh();

        toast.success("Store created successfully.");
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <div className="grid gap-8">
      <StoreForm
        form={form}
        submitId={submitId}
        onSubmit={onSubmit}
        disabled={isPending}
      />
      <div className="flex justify-end">
        <label
          htmlFor={submitId}
          className={cn(buttonVariants(), {
            "pointer-events-none opacity-50": isPending,
          })}
        >
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Publish
        </label>
      </div>
    </div>
  );
}
