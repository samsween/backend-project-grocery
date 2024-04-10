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
import { Product } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct } from "@/api/products";
import { ChangeEvent, useState } from "react";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stockQuantity: z.number(),
  image: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "File is required.")
    .optional(),
});

export const ProductForm = ({ product }: { product: Product }) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
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
              <FormLabel>Product Code</FormLabel>
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
          name="image"
          render={({ field }) => (
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
                    const { files, displayUrl } = getImageData(event);
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

        <Button type="submit">Edit</Button>
      </form>
    </Form>
  );
};
