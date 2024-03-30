import { useState } from "react";
import { AnimateRow } from "./AnimateRow";

export const Table = ({ data, fn }) => {
  let THEAD;
  if (data.length) {
    THEAD = Object.keys(data[0])?.filter((k) => k !== "_id");
  } else {
    THEAD = [];
  }
  return (
    <table className="w-full h-full">
      <thead>
        <tr className="font-bold">
          {THEAD?.map((key) => {
            return <td>{key}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        {data?.map((d, index) => {
          return (
            <AnimateRow id={d._id} key={d._id} index={index} fn={fn}>
              {Object.keys(d)
                .filter((k) => k !== "_id")
                .map((key) => {
                  return <td>{d[key]}</td>;
                })}
            </AnimateRow>
          );
        })}
      </tbody>
    </table>
  );
};
