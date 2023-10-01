"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { isValidStoreId } from "@/lib/actions/store";
import { StoreSchema } from "@/lib/validations/store";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DebounceInput } from "@/components/debounce-input";
import { StoreMediaFileForm } from "@/components/forms/store-media-file-form";
import { Icons } from "@/components/icons";

interface StoreFormProps {
  form: UseFormReturn<StoreSchema>;
  onSubmit: SubmitHandler<StoreSchema>;
  submitId: string;
  disabled: boolean;
}

export function StoreForm({
  form,
  onSubmit,
  submitId,
  disabled,
}: StoreFormProps) {
  const [validStoreId, setValidStoreId] = useState(true);

  const storeId = form.watch("id");

  useEffect(() => {
    isValidStoreId(storeId)
      .then((result) => {
        setValidStoreId(result);
      })
      .catch((err) => console.error(err));
  }, [storeId]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <StoreMediaFileForm form={form} />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2 lg:grid-cols-2">
                <div>
                  <FormLabel>Store name *</FormLabel>
                  <FormDescription>
                    Appears on receipts, invoices, and more
                  </FormDescription>
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2 lg:grid-cols-2">
                <div>
                  <FormLabel>Store description</FormLabel>
                  <FormDescription>
                    Give your store a short, clear description.
                  </FormDescription>
                </div>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2 lg:grid-cols-2">
                <div>
                  <FormLabel>Store handle *</FormLabel>
                  <FormDescription>
                    Your store is visible at this address
                  </FormDescription>
                </div>
                <FormControl>
                  <div className="relative">
                    <Icons.atSign className="absolute top-1/2 ml-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <DebounceInput
                      className="pl-9"
                      placeholder="Type your store handle here..."
                      {...field}
                    />
                  </div>
                </FormControl>
              </div>
              <FormMessage>
                {!validStoreId && "Handle already taken."}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2 lg:grid-cols-2">
                <div>
                  <FormLabel>Contact email *</FormLabel>
                  <FormDescription>
                    Where customers can contact you for support. Appears on
                    receipts and invoices.
                  </FormDescription>
                </div>
                <FormControl>
                  <div className="relative">
                    <Icons.mail className="absolute top-1/2 ml-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-10" {...field} />
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <input
          type="submit"
          id={submitId}
          hidden
          disabled={!validStoreId || disabled}
        />
      </form>
    </Form>
  );
}
