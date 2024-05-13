import { useQuery } from "@tanstack/react-query";

import { DataTable } from "../../data-table";
import { employeeColumns } from "./employee-columns";
import { getEmployees } from "@/api/employees";

export default function Employees() {
  const { data, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <DataTable columns={employeeColumns} data={data} />;
}
