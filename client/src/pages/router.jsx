import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "../components/Layout";
import { Employees } from "./employees";
import { Orders } from "./orders";
import { Products } from "./products";
import { Login } from "./login";
import { Employee } from "../pages/employee";

export const router = createBrowserRouter([
  {
    path: "/*",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "employees/:id",
        element: <Employee />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
]);

/* 

 createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/employees" element={<Employees />}>
          <Route path=":id" element={<Employee />} />
        </Route>
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
      </Route>
    </Route>
  )

  */
