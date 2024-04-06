import { useCart } from "@/providers/cartProivder";
import { Product } from "@/types/types";

export const useCartHook = () => {
  const cart = useCart();
  const total = Object.values(cart?.cart?.products ?? {}).reduce(
    (acc, product) => acc + product.price * (product.quantity ?? 1),
    0
  );
  const addToCart = (data: Product, quantity = 1) => {
    cart?.setCart((prevCart) => {
      console.log(prevCart);
      if (!prevCart) {
        return {
          products: {
            [data._id]: { ...data, quantity: quantity },
          },
          total: data.price * quantity,
        };
      }
      let newCart = { ...prevCart };
      if (newCart.products[data._id]) {
        newCart.products[data._id].quantity =
          newCart.products[data._id].quantity! + quantity;
      } else {
        newCart.products[data._id] = { ...data, quantity: quantity };
      }
      return newCart;
    });
  };
  const removeFromCart = (productId: string, deleteAll = false) => {
    cart?.setCart((prevCart) => {
      if (!prevCart) {
        return null;
      }
      let newCart = { ...prevCart };
      if (deleteAll) {
        console.log(productId);
        delete newCart.products[productId];
        console.log(newCart);
        return newCart;
      }
      if (newCart.products[productId].quantity === 1) {
        delete newCart.products[productId];
      } else {
        newCart.products[productId].quantity =
          newCart.products[productId].quantity! - 1;
      }
      return newCart;
    });
  };
  return { cart, total, addToCart, removeFromCart };
};
