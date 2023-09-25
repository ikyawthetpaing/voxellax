import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer>
      <div className="container py-10 text-sm">
        <div className="flex max-w-[300px] flex-col gap-6 py-20">
          <Link href="/">
            <Icons.voxellax className="w-28" />
          </Link>
          <p>
            Accelerate your projects with millions of ready-to-use products.
          </p>
          <div className="flex gap-6">
            <a href="https://www.facebook.com/voxellax">
              <Icons.facebook className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/voxellax">
              <Icons.instagram className="h-5 w-5" />
            </a>
            <a href="https://www.twitter.com/voxellax">
              <Icons.twitter className="h-5 w-5" />
            </a>
            <a href="https://www.youtube.com/voxellax">
              <Icons.youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row">
          <div className="text-center">
            Copyright © {new Date().getFullYear()} {siteConfig.name}. All
            rights reserved.
          </div>
          <div className="flex flex-col gap-6 md:flex-row">
            <Link
              href="/privacy"
              className="underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="underline-offset-4 hover:underline">
              Terms of Service
            </Link>
            <Link
              href="/cookiepolicy"
              className="underline-offset-4 hover:underline"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
