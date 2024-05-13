import { ColumnDef } from "@tanstack/react-table";
import { Order } from "../../../../types/db-types";
import OrderActions from "./order-actions";

/*
_id: string;
  orderNumber: number;
  orderDate: Date;
  customerNumber: number;
  product: Product;
  productQuantity: number;
  totalAmount: number;
  modeOfPayment: string;
*/

/* 
  _id: string;
  productCode: number;
  productName: string;
  productQuantity: number;
  productPrice: number;
*/

export const orderColumns: ColumnDef<Order>[] = [
  {
    header: "Order Number",
    accessorKey: "orderNumber",
  },
  {
    header: "Order Date",
    accessorKey: "orderDate",
  },
  {
    header: "Customer Number",
    accessorKey: "customerNumber",
  },
  {
    header: "Product Code",
    accessorKey: "product.productCode",
  },
  {
    header: "Product Name",
    accessorKey: "product.productName",
  },

  {
    header: "Product Quantity",
    accessorKey: "productQuantity",
  },
  {
    header: "Total Amount",
    accessorKey: "totalAmount",
  },
  {
    header: "Mode of Payment",
    accessorKey: "modeOfPayment",
  },
  {
    header: "Actions",
    cell: (row) => {
      return <OrderActions order={row.row.original} />;
    },
  },
];
