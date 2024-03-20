export const AsideNav = ({ children }) => {
  return (
    <div className="flex">
      <aside className="w-1/4 bg-slate-900 text-gray-200">
        <div className="container">
          <h1>ADMIN</h1>
          <ul className="flex flex-col gap-10">
            <li>Home</li>
            <li>About</li>
            <li>Blog</li>
          </ul>
        </div>
      </aside>
      <main className="w-full bg-slate-800 ">{children}</main>
    </div>
  );
};
