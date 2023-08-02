"use client";

import type { z } from "zod";
import { useEffect, useState } from "react";
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
import { File as FileModel, Store } from "@prisma/client";
import { FileWithPreview, StorePatchSchema } from "@/types";
import { StoreMediaFileForm } from "./store-media-file-form";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Icons } from "../icons";
import { DebounceInput } from "../debounce-input";

interface UpdateStoreFormProps {
  store: Pick<Store, "id" | "name" | "description">;
  profileImage: FileModel | null;
  coverImage: FileModel | null;
}

type Inputs = z.infer<typeof storePatchSchema>;

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export function UpdateStoreForm({
  store,
  profileImage,
  coverImage,
}: UpdateStoreFormProps) {
  const router = useRouter();
  const [storeId, setStoreId] = useState(store.id);
  const [isInputValid, setIsInputValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState<FileWithPreview | null>(
    null
  );
  const [profileImageFile, setProfileImageFile] =
    useState<FileWithPreview | null>(null);
  const [profileImageUploadProgress, setProfileImageUploadProgress] =
    useState(0);
  const [coverImageUploadProgress, setCoverImageUploadProgress] = useState(0);
  const [isLoadingDeleteBtn, setIsLoadingDeleteBtn] = useState(false);

  useEffect(() => {
    if (profileImage) {
      setProfileImageFile(() => {
        const file = new File([], profileImage.name, {
          type: "image",
          lastModified: profileImage.updatedAt.getDate(),
        });
        const fileWithPreview: FileWithPreview = Object.assign(file, {
          preview: profileImage.url,
          index: profileImage.index,
          uploaded: {
            uploadthingKey: profileImage.key,
            size: profileImage.size,
            isThumbnail: profileImage.isThumbnail ?? false,
          },
        });

        return fileWithPreview;
      });
    }

    if (coverImage) {
      setCoverImageFile(() => {
        const file = new File([], coverImage.name, {
          type: "image",
          lastModified: coverImage.updatedAt.getSeconds(),
        });
        const fileWithPreview: FileWithPreview = Object.assign(file, {
          preview: coverImage.url,
          index: coverImage.index,
          uploaded: {
            uploadthingKey: coverImage.key,
            size: coverImage.size,
            isThumbnail: coverImage.isThumbnail ?? false,
          },
        });

        return fileWithPreview;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(storePatchSchema),
    defaultValues: {
      id: store.id,
      name: store.name,
      description: store.description,
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
        form.setValue("id", storeId);
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
    if (storeId !== store.id) {
      isValidStoreId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  async function onSubmit(data: Inputs) {
    setIsLoading(true);

    try {
      const patchData: StorePatchSchema = {
        id: data.id,
        name: data.name,
        description: data.description,
      };

      if (!profileImageFile?.uploaded && profileImageFile) {
        const res = await startProfileImageUpload([profileImageFile]);
        if (res) {
          patchData.profileImage = { added: { key: res[0].fileKey } };
        }
      }

      if (!coverImageFile?.uploaded && coverImageFile) {
        const res = await startCoverImageUpload([coverImageFile]);
        if (res) {
          patchData.coverImage = { added: { key: res[0].fileKey } };
        }
      }

      const response = await fetch(`/api/stores/${storeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patchData),
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
    } catch (error) {
      console.error(error);
      return toast({
        title: "Something went wrong.",
        description: "Your store was not updated. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
    form.reset();
    router.refresh();
    return toast({
      description: "Store updated successfully.",
    });
  }

  async function deleteStore() {
    setIsLoadingDeleteBtn(true);

    try {
      const response = await fetch(`/api/stores/${storeId}`, {
        method: "DELETE",
      });

      if (!response?.ok) {
        return toast({
          title: "Something went wrong.",
          description: "Your store was not deleted. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      return toast({
        title: "Something went wrong.",
        description: "Your store was not deleted. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoadingDeleteBtn(false);
    router.push("/dashboard/stores");
    router.refresh();

    return toast({
      description: "Store deleted successfully.",
    });
  }

  return (
    <Card>
      <CardContent className="flex justify-center p-6">
        <Form {...form}>
          <form
            className="grid w-full max-w-xl gap-5"
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <StoreMediaFileForm
              profileImage={profileImageFile}
              setProfileImage={setProfileImageFile}
              coverImage={coverImageFile}
              setCoverImage={setCoverImageFile}
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
            <div className="grid grid-cols-2 gap-6">
              <LoadingButton
                type="submit"
                disabled={isLoading || !isInputValid || isLoadingDeleteBtn}
                isLoading={isLoading}
              >
                Update
                <span className="sr-only">Update store</span>
              </LoadingButton>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={isLoading || isLoadingDeleteBtn}
                  >
                    Delete
                    <span className="sr-only">Delete store</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete Store</DialogTitle>
                    <DialogDescription>
                      Make sure you want to delete. This can&apos;t be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <LoadingButton
                      type="button"
                      onClick={deleteStore}
                      variant="destructive"
                      isLoading={isLoadingDeleteBtn}
                      disabled={isLoadingDeleteBtn}
                    >
                      Delete
                    </LoadingButton>
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
