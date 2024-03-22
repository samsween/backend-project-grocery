export const Table = ({ children, orderHead }) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {[...orderHead].map((head) => {
            return (
              <th key={head} className="border bg-slate-700 text-gray-200">
                {head}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
