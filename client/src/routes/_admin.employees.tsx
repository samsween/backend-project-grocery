import Employees from "@/_components/employees";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_admin/employees")({
  component: () => (
    <div className="px-10 pt-10 flex gap-2 w-full">
      <Employees />
    </div>
  ),
});