import { getProduct } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/providers/cartProivder";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/store/products/$id")({
  component: () => <Product />,
});

const Product = () => {
  const { id } = Route.useParams();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: [`product-${id}`],
    queryFn: async () => getProduct(id),
  });
  const cart = useCart();
  const addToCart = () => {
    let newCart;
    if (cart?.cart?.products.length) {
      if (cart.cart.products.find((prod) => prod._id === id)) {
        const updatedQuantity = cart.cart.products.map((prod) => {
          if (prod._id === id && prod.quantity) {
            let newQuant = prod.quantity + 1;
            return { ...prod, quantity: newQuant };
          }

          return prod;
        });
        console.log(updatedQuantity);
        newCart = {
          products: updatedQuantity,
          total: updatedQuantity.reduce((a, b) => {
            if (b.quantity) return a + b.productPrice * b.quantity;
            return a + b.productPrice;
          }, 0),
        };
      } else {
        newCart = {
          products: [...cart.cart?.products, { ...data, quantity: 1 }],
          total: [...cart.cart?.products, data].reduce((a, b) => {
            if (b.quantity)
              return (
                parseInt(a) + parseInt(b.productPrice) * parseInt(b.quantity)
              );
            return parseInt(a) + parseInt(b.productPrice);
          }, 0),
        };
      }
    } else {
      newCart = {
        products: [{ ...data, quantity: 1 }],
        total: parseInt(data.productPrice),
      };
    }
    cart?.setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast({
      title: "Added to cart!",
      description: `Added ${data.productName} to cart.`,
    });
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <main className="min-h-screen container flex justify-center bg-white">
      <div className=" w-full h-full  mt-32 flex">
        <img
          alt="Product"
          className="object-cover rounded-t-lg w-1/2 h-fit"
          src={`${data.imagePath}`}
          style={{
            aspectRatio: "500/400",
            objectFit: "cover",
          }}
        />
        <div className="p-8 flex flex-col gap-4 w-full">
          <h1 className="text-3xl font-semibold">{data.productName}</h1>
          <p>ID: {data._id}</p>
          <h3 className="text-xl">${parseInt(data.productPrice).toFixed(2)}</h3>
          <Input type="number" className="w-fit" defaultValue={1} />
          <Button className="w-full" variant="outline" onClick={addToCart}>
            Add To Cart
          </Button>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            facere laudantium magni error explicabo hic cum. Maiores ratione,
            sit reiciendis, autem odit vitae eaque non excepturi minus repellat
            repudiandae totam!
          </p>
        </div>
      </div>
    </main>
  );
};
