import { OrderTable } from "@/components/table/order/OrderTable";
import { orderService } from "@/utils/orderService";
import Image from "next/image";

async function getOrder() {
  const data = await orderService.getOrders();
  return data;
}

export default async function Home() {
  const orders = await getOrder();

  return (
    <main className="flex min-h-screen p-24">
      <OrderTable data={orders} />
    </main>
  );
}
