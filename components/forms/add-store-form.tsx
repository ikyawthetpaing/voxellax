"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { addStoreAction } from "@/lib/actions/store";
import { cn } from "@/lib/utils";
import {
  AddStoreSchema,
  StoreSchema,
  storeSchema,
} from "@/lib/validations/store";
import { useUploadThing } from "@/hooks/use-uploadthing";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
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
          id: data.id,
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

        await addStoreAction(postData);

        toast({
          description: "Store created successfully.",
        });

        router.refresh(); // automatically redirect to /dashboard
      } catch (error) {
        console.error(error);
        toast({
          description: "Your store was not created. Please try again.",
          variant: "destructive",
        });
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
