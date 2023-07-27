"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { collectionPostSchema } from "@/lib/validations/collection";
import { CollectionPrivacy } from "@prisma/client";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type CollectionSchema = z.infer<typeof collectionPostSchema>;

interface CreateCollectionFormProps {
  setCreating: Dispatch<SetStateAction<boolean>>;
}

export function CreateCollectionForm({
  setCreating,
}: CreateCollectionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const collectionPrivaies = [
    CollectionPrivacy.Private,
    CollectionPrivacy.Public,
    CollectionPrivacy.Unlisted,
  ];

  // react-hook-form
  const form = useForm<CollectionSchema>({
    resolver: zodResolver(collectionPostSchema),
    defaultValues: {
      name: "",
      privacy: CollectionPrivacy.Private,
    },
  });

  async function onSubmit(data: CollectionSchema) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/collections", {
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
        description: "Your collection was not created. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
    setCreating(false);
    router.refresh();
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
                <Input
                  placeholder="Type your collection name here..."
                  {...field}
                />
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
                      {collectionPrivaies.map((value) => (
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
