import { UserContext } from "@/providers/authProvider";

import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
type RouterContext = {
  authentication: UserContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
