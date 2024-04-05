import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCartHook } from "@/hooks/useCart";
import { CartProduct, useCart } from "@/providers/cartProivder";
import { CircleX } from "lucide-react";

export const ProductCard = ({ product }: { product: CartProduct }) => {
  const cart = useCartHook();

  const onDelete = () => {
    console.log("Deleting");
    cart.removeFromCart(product._id, true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) <= 0) {
      cart.removeFromCart(product._id, true);
      return;
    }
    cart.addToCart(product, parseInt(e.target.value));
  };
  return (
    <Card className="w-full max-w-xs min-w-fit relative">
      <CircleX className="absolute right-0 top-0 z-[100]" onClick={onDelete} />
      <div className="aspect-w-4 aspect-h-5 relative">
        <img
          alt="Product"
          className="object-cover rounded-t-lg"
          height={500}
          src={`${product.imagePath}`}
          style={{
            aspectRatio: "500/400",
            objectFit: "cover",
          }}
          width={400}
        />
      </div>
      <CardHeader className="grid gap-1 p-4">
        <CardTitle>{product.productName}</CardTitle>
        <CardDescription>Best product ever</CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex justify-between">
        <p className="text-3xl font-semibold">${product.productPrice}</p>
        {product.quantity && (
          <Input
            type="number"
            className="w-fit"
            onChange={onChange}
            defaultValue={product.quantity}
          />
        )}
      </CardContent>
    </Card>
  );
};
