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
import { useCart } from "@/providers/cartProivder";
import { useMemo } from "react";
import { CartProductCard } from "./cart-product-card";

export const CartDrawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const cart = useCart();

  const total = useMemo(() => {
    if (!cart) return null;
    return cart?.cart?.reduce(
      (acc, c) => acc + c.product.price * c.quantity,
      0
    );
  }, [cart]);
  console.log(cart);
  if (cart.isLoading) return <p>Loading...</p>;
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="container mx-auto">
        <DrawerHeader>
          <DrawerTitle className="text-4xl">
            {total && total.toFixed(2)}
          </DrawerTitle>

          <DrawerDescription className="flex gap-2 overflow-x-scroll">
            {cart.cart?.map((c) => {
              return <CartProductCard product={c} />;
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
  );
};
