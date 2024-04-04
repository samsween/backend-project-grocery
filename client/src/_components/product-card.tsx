import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CartProduct, useCart } from "@/providers/cartProivder";
import { Product } from "@/types/types";
import { CircleX } from "lucide-react";
import { useState } from "react";

export const ProductCard = ({ product }: { product: CartProduct }) => {
  const cart = useCart();
  const onDelete = () => {
    const { _id } = product;
    if (cart?.cart) {
      const newProducts = cart.cart.products.filter((a) => a._id !== _id);
      const newTotal = newProducts.reduce((a, b) => a + b.productPrice, 0);
      const newCart = { products: newProducts, total: newTotal };
      cart.setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) === 0) return onDelete();
    if (cart?.cart?.products.length) {
      if (cart.cart.products.find((prod) => prod._id === product._id)) {
        const updatedQuantity = cart.cart.products.map((prod) => {
          if (prod._id === product._id && prod.quantity) {
            let newQuant = parseInt(e.target.value);
            return { ...prod, quantity: newQuant };
          }

          return prod;
        });
        cart.setCart({
          products: updatedQuantity,
          total: updatedQuantity.reduce((a, b) => {
            if (b.quantity) return a + b.productPrice * b.quantity;
            return a + b.productPrice;
          }, 0),
        });
      }
    }
  };
  return (
    <Card className="w-full max-w-xs min-w-fit relative" key={product._id}>
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
