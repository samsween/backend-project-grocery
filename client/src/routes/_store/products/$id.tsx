import { getProduct } from "@/api/products";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCartHook } from "@/hooks/useCart";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_store/products/$id")({
  component: () => <Product />,
});

const Product = () => {
  const { id } = Route.useParams();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: [`product-${id}`],
    queryFn: async () => getProduct(id),
  });
  const cart = useCartHook();
  const addToCart = () => {
    cart.addToCart(data);
    toast({
      title: "Added to cart!",
      description: (
        <>
          <h1 className="text-2xl font-semibold">{data.productName}</h1>
          <img src={data.imagePath} alt="Product" className="w-16 h-16" />
          <p>{data.productName} added to cart</p>
        </>
      ),
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
