import { CartDrawer } from "@/_components/store-components/cart/cart-drawer";
import { CartIndicator } from "@/_components/store-components/cart/cart-indicator";
import { getCategories } from "@/api/categories";
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
  const [cartOpen, setCartOpen] = useState<boolean>(false);
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
                <CartIndicator />

                <ShoppingCart />
              </li>
              <li>
                <User />
              </li>
            </ul>
          </div>
        </div>
      </header>
      <CartDrawer open={cartOpen} setOpen={setCartOpen} />
    </>
  );
};
