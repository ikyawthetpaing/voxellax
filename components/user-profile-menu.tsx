"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import { User } from "@/db/schema";

import { baseConfig } from "@/config/base";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserProfileMenuProps {
  user: User;
}

export function UserProfileMenu({ user }: UserProfileMenuProps) {
  const userNavItems = baseConfig.profileMenu.user(user.id).navItems;
  const sellerNavItems = baseConfig.profileMenu.seller().navItems;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage src={user.image || ""} alt={user.name || ""} />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href={`/user/${user.id}`}>
          <DropdownMenuItem>
            <div className="flex gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.image || ""} alt={user.name || ""} />
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
          {userNavItems.map((navItem, index) => {
            return (
              <Link key={index} href={navItem.href}>
                <DropdownMenuItem key={navItem.title}>
                  <span>{navItem.title}</span>
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuGroup>
        {user.role === "user" ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/seller">
                <DropdownMenuItem>Become a seller</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </>
        ) : (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {sellerNavItems.map((navItem, index) => {
                return (
                  <Link key={index} href={navItem.href}>
                    <DropdownMenuItem key={navItem.title}>
                      <span>{navItem.title}</span>
                    </DropdownMenuItem>
                  </Link>
                );
              })}
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        {/* <Link href="/logout"> */}
        <DropdownMenuItem onClick={() => signOut()}>
          <span>Log out</span>
        </DropdownMenuItem>
        {/* </Link> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
