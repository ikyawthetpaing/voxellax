"use client";

import { signOut } from "next-auth/react";
import { User } from "next-auth";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Icons } from "@/components/icons";
import { lobbyUserDropdownConfig } from "@/config/lobby";
import { dashboardConfig } from "@/config/dashboard";

interface UserDropdownMenuProps {
  user: User;
  isAdmin: boolean;
}

export function UserDropdownMenu({ user, isAdmin }: UserDropdownMenuProps) {
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
        <Link href={`/user/${user.id}`}>
          <DropdownMenuItem>
            <div className="flex gap-3">
              <Avatar className="h-9 w-9">
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
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {lobbyUserDropdownConfig(user.id).navItems.map((navItem, index) => {
            // const Icon = Icons[navItem.icon ?? "check"];
            return (
              <Link key={index} href={navItem.href}>
                <DropdownMenuItem key={navItem.title}>
                  {/* <Icon className="mr-2 h-4 w-4" /> */}
                  <span>{navItem.title}</span>
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuGroup>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {dashboardConfig.navItems.map((navItem, index) => {
                // const Icon = Icons[navItem.icon ?? "check"];
                return (
                  <Link key={index} href={navItem.href}>
                    <DropdownMenuItem key={navItem.title}>
                      {/* <Icon className="mr-2 h-4 w-4" /> */}
                      <span>{navItem.title}</span>
                    </DropdownMenuItem>
                  </Link>
                );
              })}
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          {/* <Icons.logout className="mr-2 h-4 w-4" /> */}
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
