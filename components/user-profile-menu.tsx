"use client";

import Link from "next/link";
import { data } from "@/constants/data-dev";

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
  // user: User;
  // isAdmin: boolean;
}

export function UserProfileMenu() {
  //{ user, isAdmin }: UserProfileMenuProps
  const user = data.users[0];
  const isSeller = true;
  const userNavItems = baseConfig.profileMenu.user(user.id).navItems;
  const sellerNavItems = baseConfig.profileMenu.seller().navItems;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href={`/user/${user.id}`}>
          <DropdownMenuItem>
            <div className="flex gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>U</AvatarFallback>
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
        {isSeller ? (
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
        ) : (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Become a seller</DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
