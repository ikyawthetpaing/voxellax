"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Icons } from "./icons";

export function UserSearch() {
  const [query, setQuery] = useState<string>();
  return (
    <div>
      <form className="flex items-center gap-1 border pl-3 rounded-full">
        <button type="submit"><Icons.search className="w-4 h-4" /></button>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </form>
    </div>
  );
}
