"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/db/schema";
// import { products, type Product } from "@/db/schema";
import { type ColumnDef } from "@tanstack/react-table";

import { getCategories } from "@/config/category";
// import { toast } from "sonner";

import { formatDate, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { Icons } from "../icons";
import { UpdateProductFormSheet } from "./update-product-form-sheet";

// import { deleteProductAction } from "@/app/_actions/product";

interface ProductsTableProps {
  data: Product[];
  pageCount: number;
  storeId: string;
}

export function ProductsTable({
  data,
  pageCount,
  storeId,
}: ProductsTableProps) {
  const [isPending, startTransition] = React.useTransition();
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Product, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              setSelectedRowIds((prev) =>
                prev.length === data.length ? [] : data.map((row) => row.id)
              );
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              setSelectedRowIds((prev) =>
                value
                  ? [...prev, row.original.id]
                  : prev.filter((id) => id !== row.original.id)
              );
            }}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ cell }) => {
          // const categories = Object.values(products.category.enumValues);
          const category = cell.getValue() as Product["category"];

          // if (!categories.includes(category)) return null;

          return (
            <Badge variant="outline" className="capitalize">
              {category}
            </Badge>
          );
        },
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ cell }) => formatPrice(cell.getValue() as number, 2),
      },
      // {
      //   accessorKey: "inventory",
      //   header: ({ column }) => (
      //     <DataTableColumnHeader column={column} title="Inventory" />
      //   ),
      // },
      {
        accessorKey: "rating",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Rating" />
        ),
        cell: () => 0,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <Icons.moreHorizontal className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem
                onClick={() => {
                  // now you got a read/write object
                  const current = new URLSearchParams(
                    Array.from(searchParams.entries())
                  ); // -> has to use this form

                  current.set("edit", row.original.id);

                  // cast to string
                  const search = current.toString();
                  // or const query = `${'?'.repeat(search.length && 1)}${search}`;
                  const query = search ? `?${search}` : "";

                  router.push(`${pathname}${query}`);
                }}
              >
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/listing/${row.original.id}`}>View</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                // onClick={() => {
                //   startTransition(() => {
                //     row.toggleSelected(false);

                //     toast.promise(
                //       deleteProductAction({
                //         id: row.original.id,
                //         storeId,
                //       }),
                //       {
                //         loading: "Deleting...",
                //         success: () => "Product deleted successfully.",
                //         error: (err: unknown) => catchError(err),
                //       }
                //     );
                //   });
                // }}
                disabled={isPending}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [data, isPending, storeId]
  );

  function deleteSelectedRows() {
    // toast.promise(
    //   Promise.all(
    //     selectedRowIds.map((id) =>
    //       deleteProductAction({
    //         id,
    //         storeId,
    //       })
    //     )
    //   ),
    //   {
    //     loading: "Deleting...",
    //     success: () => {
    //       setSelectedRowIds([]);
    //       return "Products deleted successfully.";
    //     },
    //     error: (err: unknown) => {
    //       setSelectedRowIds([]);
    //       return catchError(err);
    //     },
    //   }
    // );
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      filterableColumns={[
        {
          id: "category",
          title: "Category",
          options: getCategories(),
        },
      ]}
      searchableColumns={[
        {
          id: "name",
          title: "names",
        },
      ]}
      newRowLink={`/dashboard/stores/${storeId}/products/new`}
      deleteRowsAction={() => void deleteSelectedRows()}
    />
  );
}
