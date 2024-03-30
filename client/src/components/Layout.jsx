import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/authProvider";
import { authService } from "../utils/services";
export const Layout = () => {
  const user = useAuth();

  if (!user.user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-indigo-500 to-indigo-300 min-h-screen w-full">
        <div className="container mx-auto py-32">
          <Outlet />
        </div>
      </main>
    </>
  );
};

const Header = () => {
  const user = useAuth();
  const logout = () => {
    authService.logout().then((data) => {
      user.setUser(null);
      location.reload();
    });
  };
  return (
    <header className="w-full bg-white bg-opacity-30 py-8 fixed ">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl">ADMIN</h1>
        <nav>
          <ul className="flex gap-4 items-center">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <Link to={"/admin/products"}>Products</Link>
            </li>
            <li>
              <Link to={"/admin/employees"}>Employees</Link>
            </li>
            <li>
              <Link to={"/admin/orders"}>Orders</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  logout();
                }}
                className="hover:underline"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
