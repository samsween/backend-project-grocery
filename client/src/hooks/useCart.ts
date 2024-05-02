import { addToCart, removeFromCart } from "@/api/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCartHook = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: addProdToCart } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
  const { mutateAsync: RemoveProdFromCart } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
  const addCart = async (productId: string) => {
    await addProdToCart(productId);
  };
  const removeCart = async (productId: string) => {
    await RemoveProdFromCart(productId);
  };
  return { addCart, removeCart };
};
