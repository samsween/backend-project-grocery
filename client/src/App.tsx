function App() {
  return (
    <div className="min-h-screen bg-primary">
      <header className="w-full py-8 text-xl">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-2xl font-bold uppercase">admin</h1>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <a href="/products">Products</a>
              </li>
              <li>
                <a href="/orders">Orders</a>
              </li>
              <li>
                <a href="/employees">Employees</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default App;
