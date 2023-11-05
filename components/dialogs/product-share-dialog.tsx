"use client";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import { Product } from "@/db/schema";

import { siteConfig } from "@/config/site";

import { absoluteUrl, getProductThumbnailImage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";

interface Props {
  product: Product;
}

export function ProductShareDialog({ product }: Props) {
  const thumbnail = getProductThumbnailImage(product.images);

  const description = `Hey! Checkout ${product.name} on ${siteConfig.name}.`;
  const shareUrl = absoluteUrl(`/listing/${product.id}`);
  const media = thumbnail ? thumbnail.url : siteConfig.ogImage;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Add to collection"
          className="rounded-full"
        >
          <Icons.share className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Spread the word about this product.
          </DialogDescription>
        </DialogHeader>
        <div className="grid pt-4">
          <Separator />
          <PinterestShareButton
            url={shareUrl}
            media={media}
            description={description}
          >
            <div className="flex items-center justify-center gap-2 py-3">
              <PinterestIcon className="h-6 w-6 rounded-full" />
              <span className="font-medium">Pinterest</span>
            </div>
          </PinterestShareButton>
          <Separator />
          <FacebookShareButton
            url={shareUrl}
            hashtag={siteConfig.name}
            quote={description}
          >
            <div className="flex items-center justify-center gap-2 py-3">
              <FacebookIcon className="h-6 w-6 rounded-full" />
              <span className="font-medium">Facebook</span>
            </div>
          </FacebookShareButton>
          <Separator />

          <TwitterShareButton
            url={shareUrl}
            title={description}
            related={[siteConfig.creator, "voxellax"]}
            hashtags={[siteConfig.name]}
          >
            <div className="flex items-center justify-center gap-2 py-3">
              <TwitterIcon className="h-6 w-6 rounded-full" />
              <span className="font-medium">Twitter</span>
            </div>
          </TwitterShareButton>
          <Separator />
          <EmailShareButton
            url={shareUrl}
            subject="Check Out Our Latest Digital Product!"
            body={description}
          >
            <div className="flex items-center justify-center gap-2 py-3">
              <EmailIcon className="h-6 w-6 rounded-full" />
              <span className="font-medium">Email</span>
            </div>
          </EmailShareButton>
          <Separator />
        </div>
      </DialogContent>
    </Dialog>
  );
}
