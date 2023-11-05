import Link from "next/link";

import { Icons } from "@/components/icons";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative grid min-h-screen items-center justify-center">
      <Link
        href="/"
        className="absolute left-8 top-6 z-20 flex items-center text-lg font-bold tracking-tight"
      >
        <Icons.voxellax className="w-28" aria-hidden="true" />
      </Link>
      <main>{children}</main>
    </div>
  );
}
