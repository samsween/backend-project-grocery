import { getOrders } from "@/api/orders";
import { useQuery } from "@tanstack/react-query";
import { orderColumns } from "./order-columns";
import { DataTable } from "../../data-table";
export default function Orders() {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data ? (
        <DataTable columns={orderColumns} data={data} />
      ) : (
        <div>No orders yet</div>
      )}
    </>
  );
}
