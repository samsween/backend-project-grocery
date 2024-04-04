import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Router {
    routeTree: typeof routeTree;
  }
}
function InnerApp() {
  return <RouterProvider router={router} />;
}

function App() {
  return <InnerApp />;
}
export default App;
