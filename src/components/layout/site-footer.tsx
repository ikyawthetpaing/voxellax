import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer>
      <div className="container py-10 text-sm">
        <div className="py-20 flex flex-col gap-6 max-w-[300px]">
          <Link href="/">
            <Icons.voxellax className="w-28" />
          </Link>
          <p>
            Accelerate your projects with millions of ready-to-use products.
          </p>
          <div className="flex gap-6">
            <a href="/">
              <Icons.facebook className="w-5 h-5" />
            </a>
            <a href="/">
              <Icons.instagram className="w-5 h-5" />
            </a>
            <a href="/">
              <Icons.twitter className="w-5 h-5" />
            </a>
            <a href="/">
              <Icons.youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-6 md:flex-row justify-between">
          <div className="text-center">
            Copyright © {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <Link
              href="/privacy"
              className="hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link
              href="/cookiepolicy"
              className="hover:underline underline-offset-4"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
