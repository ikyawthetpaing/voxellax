"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getCategories, getSubcategories } from "@/config/category";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const categories = getCategories();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Icons.menu className="h-4 w-4" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pb-0 pl-1 pr-0">
        <ScrollArea className="my-4 h-full pb-4 pl-6">
          <div className="pl-1 pr-7">
            <Accordion type="multiple" className="w-full">
              {categories.map((category, index) => (
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
            <nav className="flex flex-col gap-4 py-6">
              <Link href={"/login"}>Login</Link>
              <Link href={"/register"}>Sign Up</Link>
            </nav>
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
