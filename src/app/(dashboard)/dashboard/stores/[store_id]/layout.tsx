import { notFound, redirect } from "next/navigation";
import { Tabs } from "@/components/tabs";
import { Shell } from "@/components/shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackButton } from "@/components/back-button";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { dashboardStoreConfig } from "@/config/dashboard";

interface StoreLayoutProps {
  children: React.ReactNode;
  params: {
    store_id: string;
  };
}

export default async function StoreLayout({
  children,
  params,
}: StoreLayoutProps) {
  const store_id = params.store_id;

  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const store = await db.store.findFirst({
    where: {
      id: store_id,
    },
    select: {
      name: true,
      description: true,
    },
  });

  if (!store) {
    notFound();
  }

  return (
    <Shell>
      <div>
        <BackButton variant="ghost" />
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 items-center">
          <Avatar className="cursor-pointer w-24 h-24">
            <AvatarImage src={"/kfla/fdjl"} alt={store.name} />
            <AvatarFallback>{store.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-xl font-medium capitalize">{store.name}</h1>
            <p className="line-clamp-2 text-muted-foreground">
              {store.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Tabs
          items={dashboardStoreConfig(store_id).navItems}
          className="grid-cols-4"
        />
      </div>
      {children}
    </Shell>
  );
}
