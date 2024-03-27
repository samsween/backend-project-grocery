import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto py-8">
        <Outlet />
      </main> 
    </>
  );
};

const Header = () => {
  return (
    <header className="w-full bg-slate-900 text-white py-8 ">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl">Store</h1>
        <nav>
          <ul className="flex gap-4 items-center">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="/employees" className="hover:underline">
                Employees
              </a>
            </li>
            <li>
              <a href="/orders" className="hover:underline">
                Orders
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
