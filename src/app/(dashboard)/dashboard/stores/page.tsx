import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import { Shell } from "@/components/shell";
import { getCurrentUser } from "@/lib/session";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export const metadata: Metadata = {
  title: "Stores",
  description: "Manage your stores",
};

export default async function StoresPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const stores = await db.store.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      description: true
    }
  })

  return (
    <Shell>
      <Header title="Stores" description="Manage your stores"/>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {stores.length ? stores.map((store) => (
          <Card key={store.id} className="flex h-full flex-col">
            <CardHeader className="flex flex-1 flex-col items-center">
              <Avatar className="mb-4 h-24 w-24">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>{store.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="line-clamp-1">{store.name}</CardTitle>
              <CardDescription className="line-clamp-1">
                {store.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link key={store.id} href={`/dashboard/stores/${store.id}`}>
                <div
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      className: "h-8 w-full",
                    })
                  )}
                >
                  View store
                  <span className="sr-only">View {store.name} store</span>
                </div>
              </Link>
            </CardContent>
          </Card>
        )) : null}
        {stores.length < 3 && (
          <Card className="flex h-[266px] items-center justify-center border-dashed">
            <CardContent className="p-0">
              <Link href="/dashboard/stores/new">
                <div
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      className: "h-8 w-full",
                    })
                  )}
                >
                  Create a store
                  <span className="sr-only">Create a new store</span>
                </div>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Shell>
  );
}
