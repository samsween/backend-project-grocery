import Orders from "@/_components/admin-components/orders";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/orders")({
  component: () => <OrderPage />,
});

const OrderPage = () => {
  return (
    <div className="px-10 pt-10 flex gap-2 w-full">
      <Orders />
    </div>
  );
};
