import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Category, Product } from "@/types/db-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, editProduct } from "@/api/products";
import { ChangeEvent, useState } from "react";
import { getCategories } from "@/api/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/_components/spinner";
import { useRouter } from "@tanstack/react-router";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(4),
  price: z.coerce
    .number({
      invalid_type_error: "Not a number",
    })
    .gte(1, "Must be 1 and above"),
  stockQuantity: z.coerce
    .number({
      invalid_type_error: "Not a number",
    })
    .gte(0, "Must be 0 and above"),
  featured: z.string(),
  category: z.string(),
  image: z.any(),
});
/*
z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "File is required.")
    .optional(),
*/

export const ProductForm = ({ product }: { product: Product }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteOpen, setisDeleteOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      featured: product.featured.toString(),
      category: product.category?._id || "",
    },
    resolver: zodResolver(formSchema),
  });
  const { mutateAsync: DeleteProduct, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: editProduct,
    mutationKey: ["edit-product"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", product._id],
      });
    },
  });
  const { data: Category } = useQuery<Category[]>({
    queryKey: ["category"],
    queryFn: getCategories,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append("category", values.category);
    formData.append("stockQuantity", values.stockQuantity.toString());
    formData.append("featured", values.featured);
    if (values.image) {
      formData.append("image", values.image[0]);
    }
    await mutateAsync({ id: product._id, product: formData });
    toast({
      title: `${product.name} updated`,
    });
    router.invalidate();
  }

  function getImageData(event: ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();

    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
  }
  const [preview, setPreview] = useState(product.imagePath);
  const fileRef = form.register("image");
  return (
    <>
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full p-8 bg-background shadow"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 w-full">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={product.category?._id || ""}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Category?.map((c) => {
                          return (
                            <SelectItem key={c._id} value={c._id}>
                              {c.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={product.featured.toString()}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {[true, false]?.map((t) => {
                          return (
                            <SelectItem key={t.toString()} value={t.toString()}>
                              {t.toString()}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="image"
            render={({}) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <img src={preview} className="w-40" />
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Image"
                    className="appearance-none"
                    {...fileRef}
                    onChange={(event) => {
                      const { displayUrl } = getImageData(event);
                      console.log(displayUrl);
                      setPreview(displayUrl);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormDescription>
            Please enter the details of the product.
          </FormDescription>
          <div className="flex w-full gap-4 items-center">
            {isLoading ? (
              <Spinner />
            ) : (
              <Button type="submit" className="" disabled={isLoading}>
                Edit
              </Button>
            )}
            <Button
              variant={"destructive"}
              type="button"
              disabled={isPending}
              onClick={() => {
                setisDeleteOpen(true);
              }}
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
      <AlertDialog open={isDeleteOpen} onOpenChange={setisDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              product
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await DeleteProduct(product._id);
                setisDeleteOpen(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
