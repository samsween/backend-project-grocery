import { getProducts } from "@/api/products";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const sortFunctions = {
  price: {
    asc: (a: any, b: any) => {
      return b.productPrice - a.productPrice;
    },
    dsc: (a: any, b: any) => {
      return a.productPrice - b.productPrice;
    },
  },
  default: {
    asc: () => 0,
    dsc: () => 0,
  },
};

export const Route = createFileRoute("/store/products/")({
  component: () => <Products />,
});

const Products = () => {
  const { data, isLoading } = useQuery({
    queryFn: getProducts,
    queryKey: ["products-store"],
  });
  const [sort, setSort] = useState<"price" | "default">("default");
  const [sortState, setSortState] = useState<"asc" | "dsc">("asc");
  const [search, setSearch] = useState("");
  const searchData = useMemo(() => {
    if (!data) return [];
    if (!search) return data;
    return data.filter((item: any) =>
      item.productName.toLowerCase().includes(search)
    );
  }, [search, data]);
  const sortData = useMemo(() => {
    if (!data) return [];
    return [...searchData].sort(sortFunctions[sort][sortState]);
  }, [searchData, sort, sortState]);

  console.log(sortData);

  if (isLoading) return <p>Loading...</p>;
  return (
    <main className="py-10 container mx-auto h-full w-full bg-white">
      <div className="py-10 bg-slate-600 text-white uppercase text-5xl container mx-auto">
        Men
      </div>
      <div className="w-full flex justify-between items-center pt-10 ">
        <Input
          type="text"
          placeholder="Search..."
          className="w-fit"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
        />
        <div className="flex gap-2 items-center">
          <p>Sort by:</p>
          <Select
            onValueChange={(e) => {
              if (e === "price" || e === "default") {
                setSort(e);
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">price</SelectItem>
              <SelectItem value="default">default</SelectItem>
            </SelectContent>
          </Select>
          <ArrowUpDown
            onClick={() => {
              setSortState((prev) => (prev === "asc" ? "dsc" : "asc"));
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 py-10 gap-10">
        {sortData?.map((product: any) => {
          return (
            // <Card className="w-full " key={product._id}>
            //   <Link
            //     to={"/store/products/$id"}
            //     params={{
            //       id: product._id,
            //     }}
            //   >
            //     <div className="aspect-w-4 aspect-h-5 relative">
            //       <img
            //         alt="Product"
            //         className="object-cover rounded-t-lg"
            //         height={500}
            //         src={`${product.imagePath}`}
            //         style={{
            //           aspectRatio: "500/400",
            //           objectFit: "cover",
            //         }}
            //       />
            //     </div>
            //     <CardHeader className="grid gap-1 p-4">
            //       <CardTitle>{product.productName}</CardTitle>
            //       <CardDescription>Best product ever</CardDescription>
            //     </CardHeader>
            //     <CardContent className="p-4 flex justify-between">
            //       <p className="text-3xl font-semibold">
            //         ${product.productPrice}
            //       </p>
            //     </CardContent>
            //   </Link>
            // </Card>
            <Card className="w-full max-w-xs rounded-xl border width">
              <Link
                to={"/store/products/$id"}
                params={{
                  id: product._id,
                }}
              >
                <div className="grid gap-4 p-4">
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
                    <img
                      alt="Product image"
                      className="aspect-[4/5] object-cover border w-full"
                      height="500"
                      src={product.imagePath}
                      width="400"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <h3 className="font-semibold text-sm md:text-base">
                      {product.productName}
                    </h3>
                    <p className="font-semibold text-sm md:text-base">
                      ${product.productPrice}
                    </p>
                    <p className="text-sm md:text-gray-500 text-muted">
                      Stylish and comfortable tee for everyday wear
                    </p>
                  </div>
                </div>
              </Link>
            </Card>
          );
        })}
      </div>
    </main>
  );
};
