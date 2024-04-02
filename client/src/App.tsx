import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AuthContexthProvider, useAuth } from "./providers/authProvider";
const router = createRouter({
  routeTree,
  context: {
    authentication: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Router {
    routeTree: typeof routeTree;
  }
}
function InnerApp() {
  const authentication = useAuth();
  return <RouterProvider router={router} context={{ authentication }} />;
}

function App() {
  return (
    <AuthContexthProvider>
      <InnerApp />
    </AuthContexthProvider>
  );
}
export default App;
