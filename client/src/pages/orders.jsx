import { useQuery } from "@tanstack/react-query";
import { orderService } from "../utils/services";
import { useMemo, useState } from "react";
import { Loading } from "./loading";
import { Table } from "../components/Table";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: orderService.getOrders,
  });
  const [search, setSearch] = useState("");
  const transFormedOrders = useMemo(() => {
    if (!data) return;
    return data.map((order) => {
      const { product, ...restOfOrder } = order;
      return {
        ...restOfOrder,
        productCode: product.productCode,
        productName: product.productName,
        productPrice: product.productPrice,
      };
    });
  }, [data]);
  const navigate = useNavigate();
  const onTableClick = (id) => {
    navigate(`/admin/orders/${id}`);
  };
  const sortedData = useMemo(() => {
    if (!transFormedOrders) return [];
    if (search === "") return transFormedOrders;
    let sorted = [...transFormedOrders].filter((d) =>
      Object.values(d).some((v) => v.toString().toLowerCase().includes(search))
    );
    console.log(sorted);
    return sorted;
  }, [transFormedOrders, search]);
  if (isLoading) return <Loading />;
  return (
    <div className="w-full bg-white bg-opacity-30 border-l border-b p-8">
      <input placeholder="Search..." onChange={setSearch} />
      <Table data={sortedData} onClick={onclick} />
    </div>
  );
};
