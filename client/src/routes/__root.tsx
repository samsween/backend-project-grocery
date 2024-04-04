import { Toaster } from "@/components/ui/toaster";

import { Outlet, createRootRoute } from "@tanstack/react-router";
// type RouterContext = {
//   authentication: UserContext;
// };

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});
