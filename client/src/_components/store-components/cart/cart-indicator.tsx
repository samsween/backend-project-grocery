import { useCart } from "@/providers/cartProivder";

export const CartIndicator = () => {
  const cart = useCart();
  return (
    <>
      {cart.cart?.length && !cart.isLoading && (
        <div className="absolute h-2 text-white w-2 -right-1 -top-1 bg-red-500 text-xs text-center rounded-full"></div>
      )}
    </>
  );
};
