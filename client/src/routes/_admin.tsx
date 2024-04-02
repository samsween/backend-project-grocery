import { Layout } from "@/_components/layout";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  beforeLoad: async ({ context }) => {
    console.log(context);
    const {
      authentication: { user },
    } = context;
    if (!user?.id) {
      throw redirect({ to: "/login" });
    }
  },

  component: () => <Layout />,
});
