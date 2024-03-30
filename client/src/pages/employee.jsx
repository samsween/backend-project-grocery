import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { Loading } from "./loading";
import { employeeService } from "../utils/services";

export const Employee = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: [`employee/${id}`],
    queryFn: () => employeeService.getEmployee(id),
  });
  console.log(data);
  if (isLoading) return <Loading />;
  if (error) return <Navigate to={"/admin/employee"} />;
  return (
    <div className="w-full items-center justify-center">
      <form className="p-8 bg-white bg-opacity-30 flex flex-col gap-8">
        <h1 className="text-2xl">Edit Employee</h1>
        <div className="flex flex-col gap-4">
          <label htmlFor="empId">empId</label>
          <input
            type="text"
            className="bg-transparent border-b"
            id="empId"
            defaultValue={data.empId}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="username">username</label>
          <input
            type="text"
            className="bg-transparent border-b"
            id="username"
            defaultValue={data.username}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="password">password</label>
          <input
            type="text"
            className="bg-transparent border-b"
            id="password"
            defaultValue={data.password}
          />
        </div>
        <div className="flex gap-8">
          <button
            type="button"
            className="bg-green-800 text-white px-8 py-4 rounded-md"
            onClick={() => {}}
          >
            Save
          </button>
          <button
            type="button"
            className="bg-red-800 text-white px-8 py-4 rounded-md"
            onClick={() => {}}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
