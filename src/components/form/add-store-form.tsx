"use client";

// import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import type { z } from "zod";

import { storeSchema } from "@/lib/validations/store";
import { Button } from "@/components/ui/button";
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
import { Icons } from "@/components/icons";
import { toast } from "../ui/use-toast";
import { useState } from "react";
// import { addStoreAction } from "@/app/_actions/store";

interface AddStoreFormProps {
  userId: string;
}

type Inputs = z.infer<typeof storeSchema>;

export function AddStoreForm({ userId }: AddStoreFormProps) {
  const router = useRouter();
  // const [isPending, startTransition] = React.useTransition();
  const [isLoading, setIsLoading] = useState(false);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: Inputs) {
    setIsLoading(true);

    const response = await fetch("/api/stores", {
      method: "POST",
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
      return toast({
        title: "Something went wrong.",
        description: "Your store was not created. Please try again.",
        variant: "destructive",
      });
    }

    form.reset();
    router.push("/dashboard/stores");
    router.refresh(); // Workaround for the inconsistency of cache revalidation
    return toast({
      description: "Store created successfully.",
    });
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Add store</CardTitle>
        <CardDescription>Add a new store to your account</CardDescription>
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
            <Button className="w-fit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Add Store
              <span className="sr-only">Add Store</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}


// "use client"

// import * as React from "react"
// import { useRouter } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import type { z } from "zod"

// import { storeSchema } from "@/lib/validations/store"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Icons } from "@/components/icons"
// import { addStoreAction } from "@/app/_actions/store"
// import { toast } from "../ui/use-toast"

// interface AddStoreFormProps {
//   userId: string
// }

// type Inputs = z.infer<typeof storeSchema>

// export function AddStoreForm({ userId }: AddStoreFormProps) {
//   const router = useRouter()
//   const [isPending, startTransition] = React.useTransition()

//   // react-hook-form
//   const form = useForm<Inputs>({
//     resolver: zodResolver(storeSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//     },
//   })

//   function onSubmit(data: Inputs) {
//     startTransition(async () => {
//       try {
//         await addStoreAction({ ...data, userId })

//         form.reset()
//         toast({description: "Store added successfully."})
//         router.push("/dashboard/stores")
//         router.refresh() // Workaround for the inconsistency of cache revalidation
//       } catch (error) {
//         error instanceof Error
//           ? toast({description: error.message})
//           : toast({description: "Something went wrong, please try again."})
//       }
//     })
//   }

//   return (
//     <Form {...form}>
//       <form
//         className="grid w-full max-w-xl gap-5"
//         onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
//       >
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Type store name here." {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Type store description here."
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button className="w-fit" disabled={isPending}>
//           {isPending && (
//             <Icons.spinner
//               className="mr-2 h-4 w-4 animate-spin"
//               aria-hidden="true"
//             />
//           )}
//           Add Store
//           <span className="sr-only">Add Store</span>
//         </Button>
//       </form>
//     </Form>
//   )
// }