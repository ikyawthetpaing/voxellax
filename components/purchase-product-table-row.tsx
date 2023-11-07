"use client";

import Link from "next/link";
import { PurchasedProduct } from "@/types";

import {
  cn,
  downloadProductFiles,
  formatDate,
  formatPrice,
  getProductThumbnailImage,
} from "@/lib/utils";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { AddReviewDialog } from "@/components/dialogs/add-review-dialog";
import { ProductImage } from "@/components/product/product-image";

export function PurchaseProductTableRow({
  purchasedProduct,
}: {
  purchasedProduct: PurchasedProduct;
}) {
  const { cost, createdAt, name, images, category, files, id } =
    purchasedProduct;

  const thumbnail = getProductThumbnailImage(images);

  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-4">
          <Link href={`/listing/${id}`}>
            <ProductImage
              image={thumbnail}
              className="w-24 shrink-0 overflow-hidden rounded-lg border"
            />
          </Link>
          <div className="space-y-2">
            <h1 className="line-clamp-1 font-medium">{name}</h1>
            <p className="line-clamp-1 capitalize">{category}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>{formatPrice(cost)}</TableCell>
      <TableCell>{formatDate(createdAt)}</TableCell>
      <TableCell>
        <AddReviewDialog
          trigger={
            <div
              className={cn(
                badgeVariants({ variant: "outline" }),
                "w-max cursor-pointer"
              )}
            >
              Add Review
            </div>
          }
        />
      </TableCell>
      <TableCell>
        <Badge
          className="w-max cursor-pointer"
          variant="outline"
          onClick={() => downloadProductFiles(files)}
        >
          Download
        </Badge>
      </TableCell>
      <TableCell>
        <Badge className="w-max cursor-pointer" variant="outline">
          Download
        </Badge>
      </TableCell>
    </TableRow>
  );
}
