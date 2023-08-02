"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { storePostSchema } from "@/lib/validations/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Icons } from "@/components/icons";
import { toast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { FileWithPreview, StorePostSchema } from "@/types";
import { DebounceInput } from "../debounce-input";
import { StoreMediaFileForm } from "./store-media-file-form";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";

type Inputs = z.infer<typeof storePostSchema>;

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export function AddStoreForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [storeId, setStoreId] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const [coverImage, setCoverImage] = useState<FileWithPreview | null>(null);
  const [profileImage, setProfileImage] = useState<FileWithPreview | null>(
    null
  );
  const [profileImageUploadProgress, setProfileImageUploadProgress] =
    useState(0);
  const [coverImageUploadProgress, setCoverImageUploadProgress] = useState(0);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(storePostSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
    },
  });

  const {
    isUploading: isProfileImageUploading,
    startUpload: startProfileImageUpload,
  } = useUploadThing("profileImage", {
    onUploadError: () => {
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onUploadProgress: (progress: number) => {
      setProfileImageUploadProgress(progress);
    },
  });

  const {
    isUploading: isCoverImageUploading,
    startUpload: startCoverImageUpload,
  } = useUploadThing("coverImage", {
    onUploadError: () => {
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onUploadProgress: (progress: number) => {
      setCoverImageUploadProgress(progress);
    },
  });

  async function onSubmit(data: Inputs) {
    setIsLoading(true);

    try {
      const postData: StorePostSchema = {
        id: storeId,
        name: data.name,
        description: data.description,
      };

      if (profileImage) {
        const res = await startProfileImageUpload([profileImage]);
        if (res) {
          postData.profileImage = { key: res[0].fileKey };
        }
      }

      if (coverImage) {
        const res = await startCoverImageUpload([coverImage]);
        if (res) {
          postData.coverImage = { key: res[0].fileKey };
        }
      }

      const response = await fetch("/api/stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response?.ok) {
        if (response.status === 409) {
          return toast({
            description: "Handle already taken",
            variant: "destructive",
          });
        }
        return toast({
          title: "Something went wrong.",
          description: "Your store was not created. Please try again.",
          variant: "destructive",
        });
      }

      form.reset();
      router.push("/dashboard/stores");
      router.refresh();
      toast({
        description: "Store created successfully.",
      });
    } catch (error) {
      console.error(error);
      return toast({
        description: "Your store was not created. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  async function isValidStoreId() {
    const response = await fetch("/api/checkStore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeId: storeId,
      }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        setIsInputValid(true);
      } else {
        return toast({
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      setIsInputValid(false);
      return toast({
        description: "Handle already taken",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    isValidStoreId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  return (
    <Card>
      <CardContent className="flex justify-center p-6">
        <Form {...form}>
          <form
            className="grid w-full max-w-xl gap-6"
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <StoreMediaFileForm
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              coverImage={coverImage}
              setCoverImage={setCoverImage}
              isUploading={isLoading}
              disabled={isLoading}
            />
            <FormField
              control={form.control}
              name="id"
              render={() => (
                <FormItem>
                  <FormLabel>Handle</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Icons.atSign className="absolute top-1/2 ml-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <DebounceInput
                        className="pl-9"
                        placeholder="Type your store handle here..."
                        onChange={(value) => {
                          setStoreId(String(value));
                          form.setValue("id", String(value));
                        }}
                        value={storeId}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type your store name here..."
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
            <div className="grid grid-cols-2 gap-6">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  router.push("/dashboard/stores");
                }}
              >
                Cancel
              </Button>
              <Button disabled={isLoading || !isInputValid} type="submit">
                {isLoading && (
                  <Icons.spinner
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Add Store
                <span className="sr-only">Add Store</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
