import { createFileRoute } from "@tanstack/react-router";
import Orders from "@/_components/orders";
export const Route = createFileRoute("/_admin/orders")({
  component: () => (
    <div className="px-10 pt-10 flex gap-2 w-full">
      <Orders />
      
      {/* <AddProductForm /> */}
    </div>
  ),
});
