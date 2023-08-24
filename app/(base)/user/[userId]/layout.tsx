import { Metadata } from "next";
import { notFound } from "next/navigation";
import { data } from "@/constants/data-dev";

import { baseConfig } from "@/config/base";
import { absoluteUrl } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shell } from "@/components/shell";
import { Tabs } from "@/components/tabs";

interface UserProfileLayoutProps {
  children: React.ReactNode;
  params: {
    userId: string;
  };
}

async function getUser(userId: string) {
  const user = data.users.find(({ id }) => id === userId);
  if (!user) {
    null;
  }

  return user;
}

export async function generateMetadata({
  params,
}: UserProfileLayoutProps): Promise<Metadata> {
  const user = await getUser(params.userId);

  if (!user) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;

  // const ogUrl = new URL(`${url}/og.png`);
  // ogUrl.searchParams.set("heading", user.name ?? "");
  // ogUrl.searchParams.set("type", "Profile");
  // ogUrl.searchParams.set("mode", "dark");
  const ogUrl = `${url}/og.png`;

  return {
    title: user.name,
    // description: user.description,
    authors: [{ name: user?.name ?? "", url: `${url}/user/${user?.id}` }],
    openGraph: {
      title: user.name ?? "",
      // description: user.description,
      type: "profile",
      url: absoluteUrl(`/user/${user.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 900,
          alt: user.name ?? "",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: user.name ?? "",
      // description: user.description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function UserProfileLayout({
  children,
  params,
}: UserProfileLayoutProps) {
  const user = await getUser(params.userId);

  if (!user) {
    notFound();
  }

  const navItems = baseConfig.userProfile(user.id).navItems;

  return (
    <Shell>
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-24 w-24 cursor-pointer">
            <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-medium capitalize">{user.name}</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Tabs
          items={navItems}
          style={{
            gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))`,
          }}
        />
      </div>
      <div>{children}</div>
    </Shell>
  );
}
