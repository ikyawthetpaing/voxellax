"use client";

import * as React from "react";

import { NavItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { getCategories, getSubcategories } from "@/config/category";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  navItems?: NavItem[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Icons.menu className="h-4 w-4" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pl-1 pr-0">
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Accordion type="single" collapsible className="w-full">
              {getCategories()?.map((category, index) => (
                <AccordionItem value={category.value} key={index}>
                  <AccordionTrigger className="text-sm capitalize">
                    {category.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {getSubcategories(category.value).map(
                        (subcategory, index) => (
                          <MobileLink
                            key={subcategory.value + index}
                            href={`/category/${category.value}/${subcategory.value}`}
                            pathname={pathname}
                            setIsOpen={setIsOpen}
                          >
                            {subcategory.label}
                          </MobileLink>
                        )
                      )}
                      <MobileLink
                        key={category.value + index}
                        href={`/category/${category.value}`}
                        pathname={pathname}
                        setIsOpen={setIsOpen}
                      >
                        <span className="flex items-center justify-center">
                          All {category.label}{" "}
                          <Icons.moveRight className="ml-2 h-4 w-4" />
                        </span>
                      </MobileLink>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  children?: React.ReactNode;
  href: string;
  disabled?: boolean;
  pathname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        pathname === href && "text-foreground",
        disabled && "pointer-events-none opacity-60"
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}
