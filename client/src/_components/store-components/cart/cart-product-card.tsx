import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartHook } from "@/hooks/useCart";
import { CartProduct } from "@/providers/cartProivder";
import { CircleX } from "lucide-react";

export const CartProductCard = ({ product }: { product: CartProduct }) => {
  const cart = useCartHook();

  const onDelete = async () => {
    await cart.removeCart(product.product._id);
  };

  return (
    <Card className="w-full max-w-xs min-w-fit relative">
      <CircleX className="absolute right-0 top-0 z-[100]" onClick={onDelete} />
      <div className="aspect-w-4 aspect-h-5 relative">
        <img
          alt="Product"
          className="object-cover rounded-t-lg"
          height={500}
          src={product.product.imagePath}
          style={{
            aspectRatio: "500/400",
            objectFit: "cover",
          }}
          width={400}
        />
      </div>
      <CardHeader className="grid gap-1 p-4">
        <CardTitle>{product.product.name}</CardTitle>
      </CardHeader>
      <CardDescription className="px-4">x {product.quantity}</CardDescription>
      <CardContent className="p-4 flex justify-between">
        <p className="text-3xl font-semibold">${product.product.price}</p>
      </CardContent>
    </Card>
  );
};
