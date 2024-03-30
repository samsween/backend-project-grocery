import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Products from "./_components/products";
import Orders from "./_components/orders";

function App() {

  return (
    <div className="w-full h-full">
      <Header />
      <main className="container mx-auto">
        <Tabs defaultValue="products" className="mt-10">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="account">Employees</TabsTrigger>
          </TabsList>
          <TabsContent value="products" className="w-full">
            <Products />
          </TabsContent>
          <TabsContent value="orders">
            <Orders />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

const Header = () => {
  return (
    <div className="w-full h-full">
      <header className="w-full py-6 border bg-slate-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">Admin</h1>
          <Button>Sign Out</Button>
        </div>
      </header>
    </div>
  );
};
export default App;
