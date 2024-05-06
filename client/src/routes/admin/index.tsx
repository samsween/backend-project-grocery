import { Spinner } from "@/_components/spinner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: () => <Spinner />,
});
