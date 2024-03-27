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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*" element={<Login />} />
      
      <Route element={<Layout />} path="/admin">
        <Route path="employees" element={<Employees />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Route>
  )
);
