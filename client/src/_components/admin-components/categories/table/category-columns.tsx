import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/db-types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import CategoryActions from "./category-actions";

export const categoryColumns: ColumnDef<Category>[] = [
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    accessorKey: "name",
  },
  {
    header: "Actions",
    enableGlobalFilter: false,
    cell: (row) => {
      return <CategoryActions category={row.row.original} />;
    },
  },
];
