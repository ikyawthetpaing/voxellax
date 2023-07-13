"use client";

import * as React from "react";

import { NavItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent,SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import Link from "next/link";

interface MobileNavProps {
  navItems?: NavItem[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <Icons.menu className="h-4 w-4" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          {navItems?.map((item, index) => (
          <Link key={index} href={item.href}>{item.title}</Link>
        ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
