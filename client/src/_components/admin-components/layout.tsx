import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAuth from "@/hooks/useAuth";
import { ThemeProvider } from "@/providers/themeProvider";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Folder,
  Home,
  LogOut,
  Package,
  Package2,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { ModeToggle } from "../mode-toggle";

export const Layout = () => {
  const auth = useAuth();
  const routerState = useRouterState();
  const logout = () => {
    auth.logout();
  };
  return (
    <TooltipProvider delayDuration={10}>
      <ThemeProvider defaultTheme="dark">
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
              <Link
                to="/"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              >
                <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/admin"
                    className={
                      routerState.location.pathname === "/"
                        ? "flex h-9 w-9 items-center justify-center rounded-lg bg-muted  text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        : "flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    }
                  >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/admin/orders"
                    className={
                      routerState.location.pathname.includes("/orders")
                        ? "flex h-9 w-9 items-center justify-center rounded-lg bg-muted  text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        : "flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    }
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Orders</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Orders</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/admin/products"
                    className={
                      routerState.location.pathname.includes("/products")
                        ? "flex h-9 w-9 items-center justify-center rounded-lg bg-muted  text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        : "flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    }
                  >
                    <Package className="h-5 w-5" />
                    <span className="sr-only">Products</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Products</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/admin/users"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Users2 className="h-5 w-5" />
                    <span className="sr-only">Users</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Users</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/admin/categories"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Folder className="h-5 w-5" />
                    <span className="sr-only">Categories</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Categories</TooltipContent>
              </Tooltip>
              <ModeToggle />
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    onClick={logout}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Logout</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Logout</TooltipContent>
              </Tooltip>
            </nav>
          </aside>
          <main className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            {auth.isLoading ? (
              <div className="flex items-center justify-center h-screen w-full">
                <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-primary rounded-full"></div>
              </div>
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      </ThemeProvider>
    </TooltipProvider>
  );
};
