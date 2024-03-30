import { useQuery } from "@tanstack/react-query";
import { productService } from "../utils/services";
import { Loading } from "./loading";
import { Table } from "../components/Table";
export const Products = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });
  if (isLoading) return <Loading />;
  const onClick = () => {};
  return (
    <div className="w-full bg-white bg-opacity-30 border-l border-b p-8">
      <Table data={data} onClick={onclick} />
    </div>
  );
};
