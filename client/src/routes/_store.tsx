import { ProductCard } from "@/_components/product-card";
import { getCategories } from "@/api/categories";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useAuth from "@/hooks/useAuth";
import { useCartHook } from "@/hooks/useCart";
import { CartContextProvider } from "@/providers/cartProivder";
import { Category } from "@/types/types";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { ShoppingCart, User } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_store")({
  component: () => <StoreLayout />,
  loader: async () => {
    const categories = await getCategories();
    return { categories };
  },
});
const StoreLayout = () => {
  const { categories } = Route.useLoaderData();
  return (
    <CartContextProvider>
      <div>
        <Header categories={categories} />
        <div className="w-full h-full bg-slate-50">
          <Outlet />
        </div>

        <footer className="w-full py-4 bg-gray-50 shadow">
          <div className="container mx-auto">
            <p className="text-center">© 2021 Store</p>
          </div>
        </footer>
      </div>
    </CartContextProvider>
  );
};

const Header = ({ categories }: { categories: Category[] }) => {
  const cart = useCartHook();
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const { user } = useAuth();
  return (
    <>
      <header className="w-full py-8 bg-white shadow">
        <div className="px-44 mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-semibold cursor-pointer">
            Store
          </Link>
          <nav>
            <ul className="flex gap-4 items-center">
              {categories.map((category) => (
                <li key={category._id} className="hover:underline">
                  <Link to={`/index/${category.name}`}>
                    {category.name.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <ul className="flex gap-4 items-center">
              <li
                className="relative cursor-pointer"
                onClick={() => setCartOpen(true)}
              >
                {cart.cart?.cart?.products && (
                  <div className="absolute h-2 text-white w-2 -right-1 -top-1 bg-red-500 text-xs text-center rounded-full"></div>
                )}
                <ShoppingCart />
              </li>
              <li>
                <User />
              </li>
            </ul>
          </div>
        </div>
      </header>
      <Drawer open={cartOpen} onOpenChange={setCartOpen}>
        <DrawerContent className="container mx-auto">
          <DrawerHeader>
            <DrawerTitle className="text-4xl">
              Total ${cart.total.toFixed(2)}
            </DrawerTitle>

            <DrawerDescription className="flex gap-2 overflow-x-scroll">
              {Object.values(cart.cart?.cart?.products || {}).map(
                (product, i) => (
                  <ProductCard key={i} product={product} />
                )
              )}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Checkout</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
