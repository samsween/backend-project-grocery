import { createFileRoute } from "@tanstack/react-router";
import Products from "@/_components/products";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddProductForm } from "@/_components/products/add-product-form";
export const Route = createFileRoute("/_admin/products")({
  component: () => <ProductPage />,
});

const ProductPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-10 pt-10 flex gap-2 w-full">
      <Products />
      <div className="fixed top-10 right-10" onClick={() => setOpen(true)}>
        <PlusCircleIcon size={50} />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <AddProductForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};
