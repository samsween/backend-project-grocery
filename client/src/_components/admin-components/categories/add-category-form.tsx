import { addCategory } from "@/api/categories";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2),
});

type AddCateogryFormProps = {
  setOpen: (value: boolean) => void;
};

export const AddCategoryForm: React.FC<AddCateogryFormProps> = ({
  setOpen,
}) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      setOpen(false);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values.name);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Category Name</FormLabel>
                <Input {...field} id="name" />
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormControl>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Category"}
            </Button>
          </FormControl>
        </form>
      </Form>
    </>
  );
};
