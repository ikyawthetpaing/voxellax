"use client";

import type { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { storePatchSchema } from "@/lib/validations/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { LoadingButton } from "@/components/loading-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface UpdateStoreFormProps {
  storeId: string;
  storeName: string;
  storeDescription: string;
}

type Inputs = z.infer<typeof storePatchSchema>;

export function UpdateStoreForm({
  storeId,
  storeName,
  storeDescription,
}: UpdateStoreFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(storePatchSchema),
    defaultValues: {
      name: storeName,
      description: storeDescription,
    },
  });

  async function onSubmit(data: Inputs) {
    console.log(data);
    setIsLoading(true);

    const response = await fetch(`/api/stores/${storeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
      }),
    });

    setIsLoading(false);

    if (!response?.ok) {
      if (response.status === 403) {
        return toast({
          title: "Permission denied",
          variant: "destructive",
        });
      }
      if (response.status === 500) {
        return toast({
          title: "Internal Server Error",
          variant: "destructive",
        });
      }
      return toast({
        title: "Something went wrong.",
        description: "Your store was not updated. Please try again.",
        variant: "destructive",
      });
    }

    form.reset();
    router.refresh();
    return toast({
      description: "Store updated successfully.",
    });
  }

  async function deleteStore() {
    // setDeleteIsLoading(true);

    const response = await fetch(`/api/stores/${storeId}`, {
      method: "DELETE",
    });

    // setDeleteIsLoading(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your store was not deleted. Please try again.",
        variant: "destructive",
      });
    }

    router.push("/dashboard/stores");
    router.refresh();

    return toast({
      description: "Store deleted successfully.",
    });
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Update store</CardTitle>
        <CardDescription>
          Update your store name and description, or delete it
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="grid w-full max-w-xl gap-5"
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
                      placeholder="Type your new store name here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your store description here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <LoadingButton
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Update
                <span className="sr-only">Update store</span>
              </LoadingButton>
              {/* <LoadingButton
                type="button"
                onClick={deleteStore}
                variant="destructive"
                disabled={isLoading || isDeleteLoading}
                isLoading={isDeleteLoading}
              >
                Delete
                <span className="sr-only">Delete store</span>
              </LoadingButton> */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={isLoading}
                  >
                    Delete
                    <span className="sr-only">Delete store</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete Store</DialogTitle>
                    <DialogDescription>
                      Make sure you want to delete. This can't be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      type="button"
                      onClick={deleteStore}
                      variant="destructive"
                      disabled={isLoading}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}