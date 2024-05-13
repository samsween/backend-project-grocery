import { getProducts } from "@/api/products";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types/db-types";
import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/_store/products/")({
  component: () => <Products />,
});

const sortFunctions = {
  price: {
    asc: (a: Product, b: Product) => {
      return b.price - a.price;
    },
    dsc: (a: Product, b: Product) => {
      return a.price - b.price;
    },
  },
  default: {
    asc: () => 0,
    dsc: () => 0,
  },
};

const Products = () => {
  const { data, isLoading } = useQuery<Product[]>({
    queryFn: () => getProducts(),
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
        {sortData?.map((product: Product) => {
          return (
            <Card className="w-full max-w-xs rounded-xl border width">
              <Link
                to={"/products/$id"}
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
                      {product.name}
                    </h3>
                    <p className="font-semibold text-sm md:text-base">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm md:text-gray-500 text-muted">
                      {product.description}
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
