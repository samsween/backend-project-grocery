"use client";
import { useEffect, useState } from "react";

export const EditOrderForm = ({ id }) => {
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const getEditFormData = async () => {
      if (!id) return;
      const res = await fetch(`http://localhost:3000/api/orders/${id}`);
      const data = await res.json();
      setOrder(data);
    };
    getEditFormData();
  }, []);

  return (
    <>
      {order && (
        <form className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="orderNumber">Order Number</label>
            <input
              type="text"
              name="orderNumber"
              id="orderNumber"
              value={order.orderNumber}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="orderDate">Order Date</label>
            <input
              type="text"
              name="orderDate"
              id="orderDate"
              value={order.orderDate}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="customerNumber">Customer Number</label>
            <input
              type="text"
              name="customerNumber"
              id="customerNumber"
              value={order.customerNumber}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="productCode">Product Code</label>
            <input
              type="text"
              name="productCode"
              id="productCode"
              value={order.product.productCode}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              name="productName"
              id="productName"
              value={order.product.productName}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="productPrice">Product Price</label>
            <input
              type="text"
              name="productPrice"
              id="productPrice"
              value={order.product.productPrice}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="productQuantity">Product Quantity</label>
            <input
              type="text"
              name="productQuantity"
              id="productQuantity"
              value={order.productQuantity}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="totalAmount">Total Amount</label>
            <input
              type="text"
              name="totalAmount"
              id="totalAmount"
              value={order.totalAmount}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="modeOfPayment">Mode of Payment</label>
            <input
              type="text"
              name="modeOfPayment"
              id="modeOfPayment"
              value={order.modeOfPayment}
            />
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Update
          </button>
        </form>
      )}
    </>
  );
};
