"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FieldDescription } from "@/components/atom/field";
import { Form } from "@/components/atom/form";
import { CustomFormField } from "@/components/molecule/FormComponents";
import Link from "next/link";
import { Button } from "../atom/button";
import { Spinner } from "@/components/atom/spinner";
import { loginSchema, LoginSchemaType } from "@/lib/zodSchemas";
import { signIn } from "next-auth/react";
import { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const manualLogIn = async (values: LoginSchemaType) => {
    try {
      setIsPending(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Welcome back!");
      router.replace("/tasks");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => manualLogIn(values))}
      >
        <CustomFormField type="email" name="email" control={form.control} />
        <FieldDescription className="-mt-4 ml-1">
          We will never share your email.
        </FieldDescription>
        <CustomFormField
          type="password"
          name="password"
          control={form.control}
        />
        <div className="space-y-2">
          <div className="flex flex-col justify-center">
            <Link
              href="/forgotpassword"
              className="w-fit text-xs text-muted-foreground hover:text-foreground"
            >
              Forgot your password?
            </Link>
            <Button className="mt-2 w-2/5" type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
