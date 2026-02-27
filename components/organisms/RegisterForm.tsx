"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/atom/button";
import { Spinner } from "@/components/atom/spinner";
import { Form } from "@/components/atom/form";
import { CustomFormField } from "@/components/molecule/FormComponents";
import Link from "next/link";
import { registerSchema, RegisterSchemaType } from "@/lib/zodSchemas";
import { CustomAPIError } from "@/lib/errors";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: RegisterSchemaType) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new CustomAPIError(data?.message ?? "Register failed");
      }
      return data;
    },
    onSuccess: async (data, values) => {
      if (!data) return;
      if (!data?.success) {
        toast.error(data?.message ?? "Register failed");
        return;
      }

      // auto-login (Credentials provider)
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        console.log(res);
        toast.success("Account created. Please log in.");
        router.replace("/login");
        return;
      }

      toast.success("Account created. Welcome!");
      router.replace("/tasks");
    },
    onError: (error: Error) => {
      if (error instanceof CustomAPIError) {
        toast.error(error?.message);
      } else {
        console.log("Register Error : ", error);
        toast.error("Something went wrong while creating your account...");
      }
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutate(values))}
        className="space-y-6"
      >
        <CustomFormField
          name="name"
          type="text"
          control={form.control}
          className=" w-full"
        />
        <CustomFormField name="email" type="email" control={form.control} />
        <CustomFormField
          name="password"
          type="password"
          control={form.control}
        />
        <section className="flex justify-between">
          <div className="flex gap-x-3">
            <Button
              className="my-3 px-6 w-full"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Already a member ?
            <Button asChild variant="link" className="px-1">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
};

export default RegisterForm;
