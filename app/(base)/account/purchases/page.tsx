import { Metadata } from "next";
import { InvoiceProduct } from "@/types";

import { getProduct } from "@/lib/actions/product";
import { getUserInvoiceProducts } from "@/lib/actions/user";
import { formatDate, formatPrice, getProductThumbnailImage } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Heading } from "@/components/heading";
import { ProductImage } from "@/components/product/product-image";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Purchases",
  description: "Manage your purchases",
};

export default async function AccountPurchasesPage() {
  const invoiceProducts = await getUserInvoiceProducts();

  return (
    <Shell>
      <div className="border-b pb-2">
        <Heading>Purchases</Heading>
      </div>
      <div className="hide-scrollbar overflow-x-scroll rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="uppercase">
              <TableHead>Info</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Purchased</TableHead>
              <TableHead>Reviews</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-light">
            {invoiceProducts.map((invoiceProduct, index) => (
              <ProductTableRow key={index} invoiceProduct={invoiceProduct} />
            ))}
          </TableBody>
        </Table>
      </div>
    </Shell>
  );
}

async function ProductTableRow({
  invoiceProduct,
}: {
  invoiceProduct: InvoiceProduct;
}) {
  const { productId, cost, purchasedAt } = invoiceProduct;

  const product = await getProduct(productId);
  if (!product) {
    return null;
  }

  const thumbnail = getProductThumbnailImage(product.images);

  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-4">
          <ProductImage
            image={thumbnail}
            className="w-24 shrink-0 overflow-hidden rounded-lg border"
          />
          <div className="space-y-2">
            <h1 className="line-clamp-1 font-medium">{product.name}</h1>
            <p className="line-clamp-1 capitalize">{product.category}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>{formatPrice(cost)}</TableCell>
      <TableCell>{formatDate(purchasedAt)}</TableCell>
      <TableCell>
        <Badge className="w-max cursor-pointer" variant="secondary">
          Add Review
        </Badge>
      </TableCell>
      <TableCell>
        <Badge className="w-max cursor-pointer" variant="secondary">
          Download
        </Badge>
      </TableCell>
      <TableCell>
        <Badge className="w-max cursor-pointer" variant="secondary">
          Download
        </Badge>
      </TableCell>
    </TableRow>
  );
}
