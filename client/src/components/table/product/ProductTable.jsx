"use client";

const { Table } = require("../Table");

/* 
const ProductSchema = new Schema({
  productCode: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  poductQuantity: {
    type: Number,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
});
*/

const PRODUCT_HEAD = [
  "Product Code",
  "Product Name",
  "Product Quantity",
  "Product Price",
];

export const ProductTable = ({ data }) => {
  return (
    <div>
      <Table orderHead={PRODUCT_HEAD}>
        {data &&
          data.map((d) => {
            return (
              <tr key={d._id}>
                <td className="border border-slate-700">{d.productCode}</td>
                <td className="border border-slate-700">{d.productName}</td>
                <td className="border border-slate-700">{d.productQuantity}</td>
                <td className="border border-slate-700">{d.productPrice}</td>
              </tr>
            );
          })}
      </Table>
    </div>
  );
};
