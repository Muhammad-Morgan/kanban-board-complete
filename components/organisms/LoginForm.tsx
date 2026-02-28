"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FieldDescription } from "@/components/atom/field";
import { Form } from "@/components/atom/form";
import { CustomFormField } from "@/components/molecule/FormComponents";
import { Button } from "../atom/button";
import { Spinner } from "@/components/atom/spinner";
import { loginSchema, LoginSchemaType } from "@/lib/zodSchemas";
import { signIn, type SignInResponse } from "next-auth/react";
import { useState } from "react";

const getSignInErrorMessage = (res?: SignInResponse) => {
  if (!res) return "Sign in failed. Please try again.";

  const code = res.code ?? "";
  const error = res.error ?? "";

  const messageByCode: Record<string, string> = {
    "missing-credentials": "Please enter your email and password.",
    "invalid-credentials": "Invalid email or password.",
    credentials: "Sign in failed. Check your credentials.",
    MissingCSRF: "Session expired. Please refresh and try again.",
    AccessDenied: "Access denied. Please contact support.",
  };

  if (code && messageByCode[code]) return messageByCode[code];
  if (error && messageByCode[error]) return messageByCode[error];
  if (error === "CredentialsSignin") return "Invalid email or password.";

  return "Sign in failed. Please try again.";
};

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
        toast.error(getSignInErrorMessage(res));
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
        <FieldDescription className="-mt-4 ml-1">
          Passwords are encrypted using 1-way tool.
        </FieldDescription>
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner className="h-4 w-4" />
              Logging in...
            </>
          ) : (
            "Log In"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
