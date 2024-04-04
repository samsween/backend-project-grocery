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

const formSchema = z.object({
  productCode: z.string(),
  productName: z.string(),
  productQuantity: z.number(),
  productPrice: z.number(),
  image: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "File is required.")
    .optional(),
});

export const ProductForm = ({
  product,
  setOpen,
}: {
  product: Product;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      productCode: product?.productCode.toString() ?? "",
      productName: product.productName,
      productQuantity: product.productQuantity,
      productPrice: product.productPrice,
    },
  });
  const { mutateAsync } = useMutation({
    mutationFn: editProduct,
    mutationKey: ["edit-product"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setOpen(false);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("productCode", values.productCode);
    formData.append("productName", values.productName);
    formData.append("productPrice", values.productPrice.toString());
    formData.append("productQuantity", values.productQuantity.toString());
    if (values.image) {
      formData.append("image", values.image[0]);
    }
    await mutateAsync({ id: product._id, product: formData });
  }
  const fileRef = form.register("image");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productCode"
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
          name="productName"
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
          name="productQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Quantity</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Price</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="file" placeholder="Image" {...fileRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <img className="w-16 h-16" src={product.imagePath} />
        <FormDescription>
          Please enter the details of the product.
        </FormDescription>

        <Button type="submit">Edit</Button>
      </form>
    </Form>
  );
};
