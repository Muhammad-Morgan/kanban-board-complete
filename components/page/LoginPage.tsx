import type { ReactNode } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
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
  title = "Sign in to your account",
  description = "Welcome back. Log in to continue where you left off.",
  switchLabel = "Sign Up",
  switchHref = "/register",
  switchCta = "Create an account",
  className,
}: LoginPageProps) => {
  return (
    <div className="space-y-3">
      <Card className={cn("mx-auto w-full", className)}>
        <CardHeader className="border-b border-border/70 pb-6">
          <CardTitle className="text-lg">{title}</CardTitle>
          {description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
        </CardHeader>
        <CardContent className="pt-6">
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center gap-1 border-t border-border/70 pt-6 text-sm text-muted-foreground">
          {switchCta}{" "}
          <Button asChild variant="link" className="px-1">
            <Link href={switchHref}>{switchLabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
