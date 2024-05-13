import { getUsers } from "@/api/users";
import { DataTable } from "../../data-table";
import { userColumns } from "./user-columns";
import { useQuery } from "@tanstack/react-query";

export default function Users() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <DataTable columns={userColumns} data={data} />;
}
