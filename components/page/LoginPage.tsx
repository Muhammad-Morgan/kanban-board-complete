import type { ReactNode } from "react";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardTitle,
} from "@/components/atom/card";
import { Button } from "@/components/atom/button";
import LoginForm from "@/components/organisms/LoginForm";
import { cn } from "@/lib/utils";
type LoginPageProps = {
  title?: string;
  description?: string;
  switchLabel?: string;
  switchHref?: string;
  switchCta?: string;
  termsText?: ReactNode;
  className?: string;
};

const LoginPage = async ({
  title = "Login to your account",
  switchLabel = "Sign Up",
  switchHref = "/register",
  switchCta = "Create an account",
  className,
}: LoginPageProps) => {
  return (
    <div className="space-y-3">
      <Card className={cn("mx-auto w-full", className)}>
        <CardTitle className=" ml-6 text-lg">{title} </CardTitle>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardAction className="text-sm text-muted-foreground ml-6">
          {switchCta}{" "}
          <Button asChild variant="link" className="px-1">
            <Link href={switchHref}>{switchLabel}</Link>
          </Button>
        </CardAction>
      </Card>
    </div>
  );
};

export default LoginPage;
