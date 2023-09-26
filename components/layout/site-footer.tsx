import Link from "next/link";

import { baseConfig } from "@/config/base";
import { siteConfig } from "@/config/site";

import { Icons } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer>
      <div className="container py-10 text-sm">
        <div className="flex justify-between gap-8 pb-20 max-lg:flex-col">
          <div className="flex max-w-[300px] flex-col gap-6">
            <Link href="/">
              <Icons.voxellax className="w-28" />
            </Link>
            <p>
              Accelerate your projects with millions of ready-to-use products.
            </p>
            <div className="flex gap-6 text-muted-foreground">
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
          <div className="flex flex-wrap gap-8 lg:gap-12">
            {baseConfig.footerLinkGroups.map((linkGroup) => (
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">{linkGroup.label}</h3>
                <ul className="flex flex-col gap-4 font-light">
                  {linkGroup.links.map((link) => (
                    <li>
                      <Link
                        href={link.value}
                        className="underline-offset-4 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row">
          <div className="text-center">
            Copyright © {new Date().getFullYear()} {siteConfig.name}. All
            rights reserved.
          </div>
          <div className="flex flex-col gap-6 md:flex-row">
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="/terms" className="underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="/cookiepolicy" className="underline underline-offset-4">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
