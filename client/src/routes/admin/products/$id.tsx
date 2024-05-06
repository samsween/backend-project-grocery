import { ProductForm } from "@/_components/admin-components/products/edit-product";
import { getProduct } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Product as TProduct } from "@/types/types";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/admin/products/$id")({
  component: () => <Product />,
  loader: async ({ params: { id } }) => {
    const product = await getProduct(id);
    console.log(product);
    if (!product) throw notFound();
    return product;
  },
});

const Product = () => {
  const product: TProduct = Route.useLoaderData();
  const router = useRouter();
  // const { id } = Route.useParams();
  // const { data: product } = useQuery<TProduct>({
  //   queryKey: ["product", id],
  //   queryFn: () => getProduct(id),
  // });
  const goBack = () => router.history.back();
  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="w-1/2 mx-auto flex gap-8 flex-col py-10">
        <div className="flex gap-8 items-center">
          <Button variant={"outline"} onClick={goBack}>
            <ArrowLeft />
          </Button>

          <h1 className="font-bold text-2xl">Editing {product?.name}</h1>
        </div>

        {product && <ProductForm product={product} />}
      </div>
    </main>
  );
};
