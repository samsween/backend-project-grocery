import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  beforeLoad: async ({ context }) => {
    const {
      authentication: { user },
    } = context;
    if (!user?.id) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <div>Hello /profile!</div>,
});
