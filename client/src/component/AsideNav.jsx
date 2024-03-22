import { IconBuildingFactory2, IconList, IconUser } from "@tabler/icons-react";

export const AsideNav = ({ children }) => {
  return (
    <div className="flex">
      <aside className="w-1/4 bg-slate-900 text-gray-200">
        <div className="container">
          <ul className="flex flex-col gap-10 px-8">
            <li className="text-xl flex gap-2 items-center">
              <IconUser />
              Employees
            </li>
            <li className="text-xl flex gap-2 items-center">
              <IconList />
              Order
            </li>
            <li className="text-xl flex gap-2 items-center">
              <IconBuildingFactory2 />
              Prouct
            </li>
          </ul>
        </div>
      </aside>
      <main className="w-full bg-slate-800 ">{children}</main>
    </div>
  );
};
