import Link from "next/link";

import { Purchase } from "@/db/schema";

import { getProduct } from "@/lib/actions/product";
import { getCurrentUserReview } from "@/lib/actions/review";
import {
  cn,
  formatDate,
  formatPrice,
  getProductThumbnailImage,
} from "@/lib/utils";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { AddReviewDialog } from "@/components/dialogs/add-review-dialog";
import { ProductImage } from "@/components/product/product-image";

import { UpdateReviewDialog } from "./dialogs/update-review-dialog";
import { ProductFilesDownloadButton } from "./product-files-download-button";

export async function PurchaseProductTableRow({
  purchase,
}: {
  purchase: Purchase;
}) {
  const product = await getProduct(purchase.productId);

  if (!product) return null;

  const thumbnail = getProductThumbnailImage(product.images);
  const review = await getCurrentUserReview(product.id);

  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-4">
          <Link href={`/listing/${product.id}`}>
            <ProductImage
              image={thumbnail}
              className="w-24 shrink-0 overflow-hidden rounded-lg border"
            />
          </Link>
          <div className="space-y-2">
            <h1 className="line-clamp-1 font-medium">{product.name}</h1>
            <p className="line-clamp-1 capitalize">{product.category}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>{formatPrice(purchase.cost)}</TableCell>
      <TableCell>{formatDate(purchase.createdAt)}</TableCell>
      <TableCell>
        {review ? (
          <UpdateReviewDialog
            review={{ rate: review.rate, message: review.message }}
            productId={product.id}
            trigger={
              <div
                className={cn(
                  badgeVariants({ variant: "outline" }),
                  "w-max cursor-pointer"
                )}
              >
                Update Review
              </div>
            }
          />
        ) : (
          <AddReviewDialog
            productId={product.id}
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
        )}
      </TableCell>
      <TableCell>
        <ProductFilesDownloadButton
          files={product.files}
          className={cn(badgeVariants({ variant: "outline" }), "w-max")}
        >
          Download
        </ProductFilesDownloadButton>
      </TableCell>
      <TableCell>
        <Badge className="w-max cursor-pointer" variant="outline">
          Download
        </Badge>
      </TableCell>
    </TableRow>
  );
}
