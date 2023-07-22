import { Shell } from "@/components/shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/session";
import { Tabs } from "@/components/tabs";
import { lobbyProfileConfig } from "@/config/lobby";

interface UserProfileLayoutProps {
  children: React.ReactNode;
}

export default async function UserProfileLayout({ children }: UserProfileLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <Shell>
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-24 w-24 cursor-pointer">
            <AvatarImage
              src={user.image?.toString()}
              alt={user.name?.toString()}
            />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-medium capitalize">{user.name}</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Tabs items={lobbyProfileConfig.navItems} className="grid-cols-3"/>
      </div>
      <div>{children}</div>
    </Shell>
  );
}
