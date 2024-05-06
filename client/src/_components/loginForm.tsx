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
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";

const formSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(4),
});

type ErrorResponse = {
  error: string;
  success: boolean;
};

export const LoginForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });
  const { mutateAsync: loginUser } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      navigate({ to: "/admin" });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const e = error?.response?.data.error;
      if (e?.includes("username/password")) {
        form.setError("username", { message: e });
        form.setError("password", { message: e });
      } else {
        if (e) {
          form.setError("root", { message: e });
          return;
        }
        form.setError("root", { message: "Something went wrong" });
      }
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await loginUser({
      username: values.username,
      password: values.password,
    }).catch(() => {});
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Joe10" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*******" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
};
