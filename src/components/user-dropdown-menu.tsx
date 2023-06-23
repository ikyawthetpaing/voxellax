"use client";

import { signOut } from "next-auth/react";
import { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

interface UserDropdownMenuProps {
  user: User;
  isAdmin: boolean;
}

export function UserDropdownMenu({ user, isAdmin }: UserDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer w-9 h-9">
          <AvatarImage
            src={user.image?.toString()}
            alt={user.name?.toString()}
          />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <div className="flex gap-3">
            <Avatar className="cursor-pointer w-9 h-9">
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
          <DropdownMenuItem>
            <Icons.package className="mr-2 h-4 w-4" />
            <span>Purchases</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.bookmark className="mr-2 h-4 w-4" />
            <span>Collections</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.heart className="mr-2 h-4 w-4" />
            <span>Likes</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.shoppingCart className="mr-2 h-4 w-4" />
            <span>Cart</span>
          </DropdownMenuItem>
          {isAdmin && (
            <DropdownMenuItem>
              <Icons.store className="mr-2 h-4 w-4" />
              <span>Manage Store</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Icons.settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
