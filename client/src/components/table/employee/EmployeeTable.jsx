"use client";
/* 
const employeeSchema = new Schema({
  empId: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});*/

import { Table } from "../Table";
const EMPLOYEE_HEAD = ["Employee ID", "Username", "Password"];

export const EmployeeTable = ({ data }) => {
  return (
    <div>
      <Table orderHead={EMPLOYEE_HEAD}>
        {data &&
          data.map((d) => {
            return (
              <tr key={d._id}>
                <td className="border border-slate-700">{d.empId}</td>
                <td className="border border-slate-700">{d.username}</td>
                <td className="border border-slate-700">{d.password}</td>
              </tr>
            );
          })}
      </Table>
    </div>
  );
};
