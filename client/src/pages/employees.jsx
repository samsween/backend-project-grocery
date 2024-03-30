import { useQuery } from "@tanstack/react-query";
import { employeeService } from "../utils/services";
import { Loading } from "./loading";
import { AnimateRow } from "../components/AnimateRow";
import { Table } from "../components/Table";
import { redirect, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Modal } from "../components/Modal";

export const Employees = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: employeeService.getEmployees,
  });
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const onTableClick = (id) => {
    console.log(id);
    navigate(`/admin/employees/${id}`);
  };
  const sortedData = useMemo(() => {
    if (!data) return [];
    if (search === "") return data;
    return [...data].filter((d) =>
      Object.values(d).some((v) => v.toString().toLowerCase().includes(search))
    );
  }, [data, search]);
  if (isLoading) return <Loading />;
  return (
    <div className="w-full bg-white bg-opacity-30 border-l border-b p-8 flex flex-col gap-8">
      <input
        placeholder="Search..."
        className="bg-transparent border-b placeholder:text-black py-2"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <Table data={sortedData} fn={onTableClick} />
    </div>
  );
};
