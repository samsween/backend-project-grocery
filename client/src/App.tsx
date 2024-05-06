import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFound } from "./_components/not-found";
import { Error } from "./_components/error";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: Error,
});

declare module "@tanstack/react-router" {
  interface Router {
    TrouteTree: typeof routeTree;
  }
}
function InnerApp() {
  return <RouterProvider router={router} />;
}

function App() {
  return <InnerApp />;
}
export default App;
