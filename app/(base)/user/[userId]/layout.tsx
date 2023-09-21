import { Metadata } from "next";
import { notFound } from "next/navigation";

import { baseConfig } from "@/config/base";
import { siteConfig } from "@/config/site";
import { getUserAction } from "@/lib/actions/user";
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

export async function generateMetadata({
  params,
}: UserProfileLayoutProps): Promise<Metadata> {
  const user = await getUserAction(params.userId);

  if (!user) {
    return {};
  }

  const userName = user.name ?? "Unknown";
  const description = `${userName} is on Voxellax.`;

  const ogUrl = new URL(user.image ?? siteConfig.ogImage);
  ogUrl.searchParams.set("heading", userName);
  ogUrl.searchParams.set("type", "profile");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: {
      default: userName,
      template: `%s | ${userName} | ${siteConfig.name}`,
    },
    description: description,
    authors: [{ name: userName, url: absoluteUrl(`/user/${user.id}`) }],
    openGraph: {
      title: userName,
      description: description,
      type: "profile",
      url: absoluteUrl(`/user/${user.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 900,
          alt: userName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: userName,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function UserProfileLayout({
  children,
  params,
}: UserProfileLayoutProps) {
  const user = await getUserAction(params.userId);

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
