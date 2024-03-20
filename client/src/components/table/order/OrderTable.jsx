"use client";

import { useState } from "react";
import { Table } from "../Table";
import { EditOrderForm } from "./EditOrderForm";
import { Modal } from "@/components/modal";

const ORDER_HEAD = [
  "Order Number",
  "Order Date",
  "Customer Number",
  "Product Code",
  "Product Name",
  "Product Price",
  "Product Quantity",
  "Total Amount",
  "Mode of Payment",
];

export const OrderTable = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const handleEdit = (editId) => {
    setOpen(true);
    setId(editId);
  };
  return (
    <>
      <Table orderHead={ORDER_HEAD}>
        {data &&
          data.map((d, i) => {
            i % 2 === 0
              ? (d.bgColor = "bg-slate-800 text-gray-200")
              : (d.bgColor = "bg-slate-700 text-gray-200");
            return (
              <tr
                key={d._id}
                className={d.bgColor}
                onClick={() => handleEdit(d._id)}
              >
                <td className="border border-slate-700">{d.orderNumber}</td>
                <td className="border border-slate-700">{d.orderDate}</td>
                <td className="border border-slate-700">{d.customerNumber}</td>
                <td className="border border-slate-700">
                  {d.product.productCode}
                </td>
                <td className="border border-slate-700">
                  {d.product.productName}
                </td>
                <td className="border border-slate-700">
                  {d.product.productPrice}
                </td>
                <td className="border border-slate-700">{d.productQuantity}</td>
                <td className="border border-slate-700">{d.totalAmount}</td>
                <td className="border border-slate-700">{d.modeOfPayment}</td>
              </tr>
            );
          })}
      </Table>
      <Modal open={open} setOpen={setOpen}>
        <EditOrderForm id={id} />
      </Modal>
    </>
  );
};
