import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "../components/Layout";
import { Employees } from "./employees";
import { Orders } from "./orders";
import { Products } from "./products";
import { Home } from "./home";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />} />,
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products" element={<Products />} />
    </Route>
  )
);
