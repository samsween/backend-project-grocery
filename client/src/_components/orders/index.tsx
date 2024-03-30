import { getOrders } from "@/api/orders";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../data-table";
import { orderColumns } from "./order-columns";
export default function Orders() {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <DataTable columns={orderColumns} data={data} />;
}
