import { AddButton } from "@/_components/admin-components/add-button";
import Categories from "@/_components/admin-components/categories/table";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/admin/categories")({
  component: () => <CategoryPage />,
});

const CategoryPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-10 pt-10 flex gap-2 w-full">
      <Categories />
      <AddButton type="Category" setOpen={setOpen} open={open}>
        {/* <AddCategoryForm setOpen={setOpen} /> */}
        <div></div>
      </AddButton>
    </div>
  );
};
