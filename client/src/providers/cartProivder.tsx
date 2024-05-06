import { getCart } from "@/api/cart";
import { Product } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

export type CartProduct = {
  product: Product;
  quantity: number;
};

export type CartContext = {
  cart: CartProduct[] | null;
  isLoading: boolean;
};

const CartContext = createContext<CartContext | undefined>(undefined);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let { data: cart, isLoading } = useQuery({
    queryFn: getCart,
    queryKey: ["cart"],
  });
  return (
    <CartContext.Provider
      value={{ cart: cart?.length ? cart : null, isLoading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContext {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
