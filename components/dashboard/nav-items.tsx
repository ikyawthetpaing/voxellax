"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store } from "@/db/schema";
import { SidebarNavItem } from "@/types";
import {
  CreditCard,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

interface NavItemsProps {
  store: Store;
  navItems: SidebarNavItem[];
}

export function NavItems({ store, navItems }: NavItemsProps) {
  const pathname = usePathname();
  let defaultItem = undefined;

  navItems.map((item) => {
    let href = item.navItem.href;
    if (pathname.startsWith(href)) {
      defaultItem = href;
    }
  });

  return (
    <>
      <div className="flex justify-center">
        <Link href="/">
          <Icons.voxellax className="w-28" />
        </Link>
      </div>
      <div className="hide-scrollbar flex-1 overflow-y-auto">
        <Accordion
          type="single"
          collapsible
          className="flex w-full flex-col gap-1"
          defaultValue={defaultItem}
        >
          {navItems.map(({ navItem, subNavItems }, index) => {
            const Icon = Icons[navItem.icon || "appWindow"];

            if (subNavItems) {
              return (
                <AccordionItem
                  value={navItem.href}
                  key={index}
                  className="border-0"
                >
                  <AccordionTrigger className="rounded-lg px-4 py-2 capitalize hover:bg-accent hover:no-underline">
                    <div className="flex items-center gap-4">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {navItem.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-1 grid gap-1">
                      {subNavItems?.map((subItem, index) =>
                        subItem.disabled ? (
                          <div
                            key={index}
                            className="cursor-not-allowed rounded-lg px-4 py-2 text-muted-foreground"
                          >
                            <div className="relative pl-8 before:absolute before:left-0 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:translate-x-1/2 before:rounded-full before:bg-gray-500">
                              {subItem.title}
                            </div>
                          </div>
                        ) : (
                          <Link href={subItem.href} key={index}>
                            <div
                              className={cn(
                                "rounded-lg px-4 py-2 hover:bg-accent",
                                pathname === subItem.href && "bg-accent"
                              )}
                            >
                              <div
                                className={cn(
                                  "relative pl-8 before:absolute before:left-0 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:translate-x-1/2 before:rounded-full before:bg-gray-500",
                                  pathname === subItem.href &&
                                    "text-blue-500 before:bg-blue-500"
                                )}
                              >
                                {subItem.title}
                              </div>
                            </div>
                          </Link>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            }
            return (
              <Link href={navItem.href} key={index}>
                <div
                  className={cn(
                    "flex items-center gap-4 rounded-lg px-4 py-2 hover:bg-accent",
                    pathname == navItem.href && "bg-accent text-blue-500"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 text-muted-foreground",
                      pathname == navItem.href && "text-blue-500"
                    )}
                  />
                  {navItem.title}
                </div>
              </Link>
            );
          })}
        </Accordion>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center justify-between gap-4 rounded-lg px-4 py-2 hover:bg-accent/25">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 cursor-pointer">
                <AvatarImage src={store?.avatar?.url} alt={store?.name} />
                <AvatarFallback>{store?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="text-sm font-medium">{store?.name}</h1>
            </div>
            <Icons.moreHorizontal className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Icons.store className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{store?.name}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Team</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Invite users</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Team</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
