import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/store/")({
  component: () => <Store />,
});

const Store = () => {
  return (
    <main>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="container mx-auto flex justify-end flex-col items-end">
            <h1 className="text-6xl text-white font-semibold">
              Welcome to the store
            </h1>
            <Button className="mt-4">Shop now</Button>
          </div>
        </div>

        <img
          src="public/shoes.jpg"
          alt="Store"
          className="h-[32rem] w-full object-cover"
        />
      </div>
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-semibold">Featured Products</h2>
        <div className="grid grid-cols-4 gap-4 mt-8">
          {[1, 2, 3, 4].map((product) => (
            <Card className="w-full max-w-sm" key={product}>
              <div className="aspect-w-4 aspect-h-5 relative">
                <img
                  alt="Product"
                  className="object-cover rounded-t-lg"
                  height={500}
                  src={`public/${product}.jpg`}
                  style={{
                    aspectRatio: "500/400",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </div>
              <CardHeader className="grid gap-1 p-4">
                <CardTitle>Product</CardTitle>
                <CardDescription>Best product ever</CardDescription>
              </CardHeader>
              <CardContent className="p-4 flex justify-between">
                <p className="text-3xl font-semibold">$199</p>
                <Button>Add to cart</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

/* <Card className="w-full max-w-sm">
          <div className="aspect-w-4 aspect-h-5 relative">
            <img
              alt="Product"
              className="object-cover rounded-t-lg"
              height={500}
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/500",
                objectFit: "cover",
              }}
              width={400}
            />
          </div>
          <CardHeader className="grid gap-1 p-4">
            <CardTitle>Product</CardTitle>
            <CardDescription>Best product ever</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-3xl font-semibold">$199</p>
          </CardContent>
        </Card> */
