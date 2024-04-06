import Users from "@/_components/users";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users")({
  component: () => <UserPage />,
});

const UserPage = () => {
  return (
    <div className="px-10 pt-10 flex gap-2 w-full">
      <Users />
    </div>
  );
};
