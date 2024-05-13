import { useQuery } from "@tanstack/react-query";

import { DataTable } from "../../data-table";
import { categoryColumns } from "./category-columns";
import { getCategories } from "@/api/categories";

export default function Categories() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <DataTable columns={categoryColumns} data={data} />;
}
