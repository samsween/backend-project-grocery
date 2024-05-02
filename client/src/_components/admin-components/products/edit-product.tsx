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
import { Category, Product } from "@/types/types";
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

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(4),
  price: z.number().min(1),
  stockQuantity: z.number().min(1),
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
  const [isDeleteOpen, setisDeleteOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      category: product.category._id,
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
  const { mutateAsync } = useMutation({
    mutationFn: editProduct,
    mutationKey: ["edit-product"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
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
    formData.append("stockQuantity", values.stockQuantity.toString());
    if (values.image) {
      formData.append("image", values.image[0]);
    }
    await mutateAsync({ id: product._id, product: formData });
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
          className="space-y-8 w-full p-8 bg-white shadow"
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
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={product.category._id}
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
            <Button type="submit" className="">
              Edit
            </Button>
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
