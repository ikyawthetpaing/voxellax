"use client";

import { Metadata } from "next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import {
  StoreSettingsSchema,
  storeSettingsSchema,
} from "@/lib/validations/store";
import { Button, buttonVariants } from "@/components/ui/button";
import { StoreSettingsForm } from "@/components/forms/store-settings-form";
import { Heading } from "@/components/heading";
import { Shell } from "@/components/shell";

export default function DashboardSettingsGeneralPage() {
  const submitId = "store-settings-form";
  const form = useForm<StoreSettingsSchema>({
    resolver: zodResolver(storeSettingsSchema),
  });

  return (
    <Shell layout="dashboard">
      <div>
        <Heading size="sm">Store settings</Heading>
        <p className="text-muted-foreground">
          View and update your store details
        </p>
      </div>
      <StoreSettingsForm
        form={form}
        onSubmit={(data) => console.log(data)}
        submitId={submitId}
      />
      <div className="flex justify-end">
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline">Delete</Button>
          <label htmlFor={submitId} className={cn(buttonVariants())}>
            Save changes
          </label>
        </div>
      </div>
    </Shell>
  );
}
