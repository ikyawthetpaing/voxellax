"use client";

import { signOut } from "next-auth/react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  // DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { lobbyUserDropdownConfig } from "@/config/lobby";
import { dashboardConfig } from "@/config/dashboard";

interface UserDropdownMenuProps {
  user: User;
  isAdmin: boolean;
}

export function UserDropdownMenu({ user, isAdmin }: UserDropdownMenuProps) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage
            src={user.image?.toString()}
            alt={user.name?.toString()}
          />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => router.push("/profile/activity")}>
          <div className="flex gap-3">
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage
                src={user.image?.toString()}
                alt={user.name?.toString()}
              />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-medium">{user.name}</h1>
              <p className="text-xs">View your profile</p>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {lobbyUserDropdownConfig.navItems.map((navItem) => {
            const Icon = Icons[navItem.icon ?? "check"];
            return (
              <DropdownMenuItem
                key={navItem.title}
                onClick={() => router.push(navItem.href)}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{navItem.title}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {dashboardConfig.navItems.map((navItem) => {
                const Icon = Icons[navItem.icon ?? "check"];

                return (
                  <DropdownMenuItem
                    key={navItem.title}
                    onClick={() => router.push(navItem.href)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{navItem.title}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
