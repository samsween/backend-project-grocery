import { getProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { productColumns } from "./product-columns";
import { DataTable } from "../data-table";

export default function Products() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <DataTable columns={productColumns} data={data} />;
}
