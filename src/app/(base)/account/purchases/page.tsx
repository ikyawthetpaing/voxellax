import Image from "next/image";

import { formatPrice } from "@/lib/utils";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { SearchForm } from "@/components/form/search-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchases",
  description: "Manage your purchases",
};

export default function UserPurchasesPage() {
  return (
    <Shell>
      <div className="border-b pb-2">
        <h1 className="text-xl font-medium capitalize">Purchases</h1>
      </div>
      <div className="flex justify-between">
        <Button>Filter products</Button>
        <SearchForm className="p-3" />
      </div>
      <div className="hide-scrollbar overflow-x-scroll rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="uppercase">
              <TableHead>Produt</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Purchased</TableHead>
              <TableHead>License</TableHead>
              <TableHead>Reviews</TableHead>
              <TableHead>Download</TableHead>
              <TableHead>Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-light">
            {/* {data.invoices.map((invoice) => {
              const product = data.products.find(
                ({ id }) => id === invoice.productId
              );

              if (!product) {
                return null;
              }

              const price = product.licenses.find(
                ({ type }) => type === invoice.licenseType
              )?.price;

              return (
                <TableRow key={invoice.productId}>
                  <TableCell>
                    <div className="flex gap-2">
                      <div className="w-20 shrink-0 overflow-hidden rounded-lg">
                        <AspectRatio ratio={4 / 3}>
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            loading="lazy"
                          />
                        </AspectRatio>
                      </div>
                      <div>
                        <h1 className="line-clamp-1 font-medium">
                          {product.name}
                        </h1>
                        <p className="line-clamp-1">
                          {product.categories.join(" / ")}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(price || 0)}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell className="w-fit capitalize">
                    {invoice.licenseType}
                  </TableCell>
                  <TableCell>Add Review</TableCell>
                  <TableCell>Download</TableCell>
                  <TableCell>Download</TableCell>
                </TableRow>
              );
            })} */}
          </TableBody>
        </Table>
      </div>
    </Shell>
  );
}
