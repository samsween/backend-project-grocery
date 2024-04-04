import { CartContextProvider, useCart } from "@/providers/cartProivder";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProductCard } from "@/_components/product-card";

export const Route = createFileRoute("/store")({
  component: () => <StoreLayout />,
});

const StoreLayout = () => {
  return (
    <CartContextProvider>
      <div>
        <Header />
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

const Header = () => {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  return (
    <>
      <header className="w-full py-4 bg-gray-50 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Store</h1>
          <nav>
            <ul className="flex gap-4 items-center">
              <li>
                <a href="/store">Home</a>
              </li>
              <li>
                <a href="/store/products">Products</a>
              </li>
              <li
                className="relative cursor-pointer"
                onClick={() => setCartOpen(true)}
              >
                {cart?.cart?.products.length !== 0 && (
                  <div className="absolute h-2 text-white w-2 -right-1 -top-1 bg-red-500 text-xs text-center rounded-full"></div>
                )}
                <ShoppingCart />
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Drawer open={cartOpen} onOpenChange={setCartOpen}>
        <DrawerContent className="container mx-auto">
          <DrawerHeader>
            <DrawerTitle className="text-4xl">
              Total ${cart?.cart?.total}
            </DrawerTitle>

            <DrawerDescription className="flex gap-2 overflow-x-scroll">
              {cart?.cart?.products.map((product) => {
                return <ProductCard product={product} />;
              })}
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
