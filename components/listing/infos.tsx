import { HTMLAttributes } from "react";
import Link from "next/link";

import { Product, Store, User } from "@/db/schema";

import { siteConfig } from "@/config/site";

import { formatDate, getFormatedProductFilesTotalSize } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

interface ProductDetailsProps extends HTMLAttributes<HTMLDivElement> {
  seller: User | undefined;
  store: Store | undefined;
  product: Product;
}

export async function Infos({
  seller,
  store,
  product,
  className,
  ...props
}: ProductDetailsProps) {
  const { description, createdAt } = product;
  return (
    <div className={className} {...props}>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Description</AccordionTrigger>
          <AccordionContent>{description}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Highlights</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Icons.calendar className="h-4 w-4" />
                <div>
                  Created:{" "}
                  <span className="text-muted-foreground">
                    {formatDate(createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icons.package className="h-4 w-4" />
                <div>
                  File Size:{" "}
                  <span className="text-muted-foreground">
                    {getFormatedProductFilesTotalSize(product.files || [])}
                  </span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Delivery</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-6">
              <h1 className="text-xl">Instant Download</h1>
              <p className="opacity-75">
                Your files will be available to download once payment is
                confirmed. Here&apos;s how.
              </p>
              <p>
                Instant download items don’t accept returns, exchanges or
                cancellations. Please contact the seller about any problems with
                your order.
              </p>
              <div className="flex items-center gap-3">
                <Icons.heartHandshake className="h-12 w-12 shrink-0" />
                <p className="text-xs">
                  <span className="font-semibold">Purchase Protection: </span>
                  <span>
                    Shop confidently on {siteConfig.name} knowing if something
                    goes wrong with an order, we&apos;ve got your back for all
                    eligible purchases — see program terms
                  </span>
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>FAQs</AccordionTrigger>
          <AccordionContent>
            <AccordionItem value="item-4-1">
              <AccordionTrigger className="text-left">
                My email address has changed, please email to a different
                address
              </AccordionTrigger>
              <AccordionContent className="font-light text-foreground/75">
                All your purchases can be accessed from your Etsy account.
                Please follow these steps: 1. Log in to Etsy 2. Click on Your
                Account in the top right hand side of the screen 4. Click on
                Purchases and Reviews from the drop down menu 4. You will now
                see a list of your Purchases 5. Find the item you want to
                download 6. Click the black Download Files button 7. Scroll down
                a little and click on the Download button on the right hand side
                of the screen. Full instructions with pictures can be found
                here:
                https://downloadaprintable.com/how-to-access-an-etsy-download-without-email-access/
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4-2">
              <AccordionTrigger>Where is my template?</AccordionTrigger>
              <AccordionContent className="font-light text-foreground/75">
                The PDF download document contains a link to your template. Open
                up the PDF file and click the image in the centre of the page.
                This will take you through to Canva. Click on the blue button on
                the screen that appears You will now have the template added to
                your Canva account to edit as you wish
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4-3">
              <AccordionTrigger>Can I sell this template?</AccordionTrigger>
              <AccordionContent className="font-light text-foreground/75">
                No, my PLR or Commercial Licence products are not available on
                Etsy. All templates must be edited to create your own documents
                which you can then sell. To be clear, an ebook template cannot
                be sold as a template. However, the template can be made into an
                ebook by you and sold as an ebook.
              </AccordionContent>
            </AccordionItem>
          </AccordionContent>
        </AccordionItem>
        {seller && (
          <AccordionItem value="item-5">
            <AccordionTrigger>Meet the seller</AccordionTrigger>
            <AccordionContent>
              <div className="flex gap-4">
                <Link href={`/user/${store?.userId}`}>
                  <Avatar className="h-16 w-16 cursor-pointer">
                    <AvatarImage
                      src={seller.image || ""}
                      alt={seller.name || ""}
                    />
                    <AvatarFallback>{seller.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-medium capitalize">
                    {seller.name}
                  </h2>
                  <p className="text-sm">
                    <span className="text-foreground/75">Owner of </span>
                    <Link href={`/store/${store?.handle}`}>{store?.name}</Link>
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}
