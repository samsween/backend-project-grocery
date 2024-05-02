import { ColumnDef } from "@tanstack/react-table";

import { Employee } from "../../../types/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import EmployeeActions from "./employee-actions";

export const employeeColumns: ColumnDef<Employee>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    accessorKey: "empId",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    accessorKey: "username",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Password
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    accessorKey: "password",
  },
  {
    header: "Actions",
    enableGlobalFilter: false,
    cell: (row) => {
      return <EmployeeActions employee={row.row.original} />;
    },
  },
];
