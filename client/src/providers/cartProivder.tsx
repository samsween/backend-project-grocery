import { Product } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

export type CartProduct = Product & {
  quantity: number | null;
};

type Cart = {
  products: CartProduct[];
  total: number;
};

export type CartContext = {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
};

const CartContext = createContext<CartContext | undefined>(undefined);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<Cart | null>(null);
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      console.log("ls", JSON.parse(cart));
      setCart(JSON.parse(cart));
    }
  }, []);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContext | undefined {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
