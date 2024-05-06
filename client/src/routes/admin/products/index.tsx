import { createFileRoute } from "@tanstack/react-router";
import Products from "@/_components/admin-components/products";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddProductForm } from "@/_components/admin-components/products/add-product-form";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/admin/products/")({
  component: () => <ProductPage />,
});

const ProductPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-10 pt-10 flex gap-2 w-full">
      <Products />
      <div
        className="fixed bottom-10 right-10 text-black cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="fixed bottom-10 right-10 text-white dark:text-black cursor-pointer flex gap-2"
        >
          <PlusCircleIcon className="h-6 w-6" />
          Add Product
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <AddProductForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
