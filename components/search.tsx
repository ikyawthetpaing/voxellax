import { getCategories } from "@/config/category";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";

import { Separator } from "./ui/separator";

interface SearchProps {
  layout: "default" | "landing";
}

export function Search({ layout = "default" }: SearchProps) {
  if (layout === "landing") {
    return (
      <form
        action="/search"
        method="GET"
        className="flex h-16 w-full items-center gap-4 rounded-lg border px-4"
      >
        <button type="submit">
          <Icons.search className="h-4 w-4" />
        </button>
        <input
          type="text"
          placeholder="Search products"
          name="q"
          className="w-0 flex-1 bg-transparent focus:outline-none"
        />
        <Separator orientation="vertical" />
        <div>
          <Select defaultValue="all" name="category">
            <SelectTrigger className="border-0 p-0 focus:ring-0">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                {getCategories().map(({ label, value }) => (
                  <SelectItem value={value} key={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </form>
    );
  }
  return (
    <form
      action="/search"
      method="GET"
      className="flex h-9 w-full items-center gap-3 rounded-full border px-3"
    >
      <button type="submit">
        <Icons.search className="h-4 w-4" />
      </button>
      <input
        type="text"
        placeholder="Search products"
        name="q"
        className="w-0 flex-1 bg-transparent focus:outline-none"
      />
      <Separator orientation="vertical" />
      <div>
        <Select defaultValue="all" name="category">
          <SelectTrigger className="border-0 p-0 focus:ring-0">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              {getCategories().map(({ label, value }) => (
                <SelectItem value={value} key={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
