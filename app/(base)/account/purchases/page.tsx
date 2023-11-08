import { Metadata } from "next";

import { siteConfig } from "@/config/site";

import { getCurrentUserPurchases } from "@/lib/actions/purchase";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Heading } from "@/components/heading";
import { PurchaseProductTableRow } from "@/components/purchase-product-table-row";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Manage Purchases",
  description: `Effectively manage and control your purchases on ${siteConfig.name}. Easily view, track, and take action on your orders and transactions.`,
};

export default async function AccountPurchasesPage() {
  const purchases = await getCurrentUserPurchases();

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
            {purchases.map((purchase, index) => (
              <PurchaseProductTableRow key={index} purchase={purchase} />
            ))}
          </TableBody>
        </Table>
      </div>
    </Shell>
  );
}
