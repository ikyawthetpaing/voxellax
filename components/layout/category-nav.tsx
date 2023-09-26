"use client";

import { useState } from "react";
import Link from "next/link";
import { Option } from "@/types";
import { ChevronDown } from "lucide-react";

import { getCategories, getSubcategories } from "@/config/category";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export function CategoryNav() {
  return (
    <div className="container relative">
      <div className="hide-scrollbar overflow-x-scroll">
        <div className="mx-auto flex w-max">
          {getCategories().map((category, index) => (
            <NavigationMenu key={index} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface NavigationMenuProps {
  category: Option;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ category }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div
        className={cn(
          "flex w-max items-center gap-2 rounded-md rounded-b-none px-4 py-2 text-sm font-medium",
          open && "bg-accent text-accent-foreground"
        )}
      >
        <span>{category.label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition duration-200",
            open && "rotate-180"
          )}
        />
      </div>
      <div
        className={cn(
          "container absolute bottom-0 left-0 hidden translate-y-full",
          open && "block"
        )}
      >
        <div className="rounded-lg rounded-t-none border bg-background">
          <ul className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
            {getSubcategories(category.value).map((subcategory) => (
              <li key={subcategory.value}>
                <Link
                  href={`/category/${category.value}/${subcategory.value}`}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">
                    {subcategory.label}
                  </div>
                </Link>
              </li>
            ))}
            <li key={category.value}>
              <Link
                href={`/category/${category.value}`}
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">
                  <span className="flex items-center">
                    All {category.label}{" "}
                    <Icons.moveRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
