import { createFileRoute } from "@tanstack/react-router";
import Products from "@/_components/products";
export const Route = createFileRoute("/_admin/products")({
  component: () => (
    <div className="px-10 pt-10 flex gap-2 w-full">
      <Products />
    </div>
  ),
});
