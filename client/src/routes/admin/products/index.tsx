import { createFileRoute } from "@tanstack/react-router";
import Products from "@/_components/admin-components/products/table";
import { useState } from "react";
import { AddProductForm } from "@/_components/admin-components/products/table/add-product-form";
import { AddButton } from "@/_components/admin-components/add-button";

export const Route = createFileRoute("/admin/products/")({
  component: () => <ProductPage />,
});

const ProductPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-10 pt-10 flex gap-2 w-full">
      <Products />
      <AddButton type="Product" setOpen={setOpen} open={open}>
        <AddProductForm setOpen={setOpen} />
      </AddButton>
    </div>
  );
};
