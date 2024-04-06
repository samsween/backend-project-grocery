import { ColumnDef } from "@tanstack/react-table";

import { Product } from "../../types/types";
import ProductActions from "./product-actions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const productColumns: ColumnDef<Product>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (row) => {
      return (
        <div className="flex items-center">
          {row.row.original.imagePath && (
            <img
              src={row.row.original.imagePath}
              alt={row.row.original.name}
              className="h-8 w-8 "
            />
          )}
          <span className="ml-2">{row.row.original.name}</span>
        </div>
      );
    },

    accessorKey: "name",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "description",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "price",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "stockQuantity",
  },
  {
    header: "Actions",
    cell: (row) => {
      return <ProductActions product={row.row.original} />;
    },
  },
];
