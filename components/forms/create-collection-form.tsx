"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useUserCollections } from "@/context/user-collections";
import { collections } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createCollection } from "@/lib/actions/collections";
import {
  collectionPostSchema,
  CollectionSchema,
} from "@/lib/validations/collection";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

interface CreateCollectionFormProps {
  setCreating: Dispatch<SetStateAction<boolean>>;
}

export function CreateCollectionForm({
  setCreating,
}: CreateCollectionFormProps) {
  const { setRefresh } = useUserCollections();
  const [isLoading, setIsLoading] = useState(false);

  const collectionPrivacies = collections.privacy.enumValues;

  // react-hook-form
  const form = useForm<CollectionSchema>({
    resolver: zodResolver(collectionPostSchema),
    defaultValues: {
      name: "",
      privacy: collectionPrivacies[0],
    },
  });

  async function onSubmit(data: CollectionSchema) {
    setIsLoading(true);
    try {
      await createCollection(data);
    } catch (error) {
      console.error(error);
      return toast({
        title: "Something went wrong.",
        description: "Your collection was not created. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setCreating(false);
      setRefresh(true);
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Privacy</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {collectionPrivacies.map((value) => (
                        <SelectItem
                          key={value}
                          value={value}
                          className="capitalize"
                        >
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => setCreating(false)}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
