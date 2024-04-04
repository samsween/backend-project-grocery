import { Layout } from "@/_components/layout";
import { isLoggedIn } from "@/hooks/useAuth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const loggedIn = await isLoggedIn();
    if (!loggedIn) {
      throw redirect({ to: "/login" });
    }
  },

  component: () => <Layout />,
});
