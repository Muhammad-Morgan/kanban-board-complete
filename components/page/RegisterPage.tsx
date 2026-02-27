import RegisterForm from "@/components/organisms/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atom/card";
import { cn } from "@/lib/utils";

type RegisterPageProps = {
  title?: string;
  description?: string;
  className?: string;
};

const Register = async ({
  title = "Create your account",
  description = "Start organizing tasks and launching boards in minutes.",
  className,
}: RegisterPageProps) => {
  return (
    <Card className={cn("mx-auto w-full", className)}>
      <CardHeader className="border-b border-border/70 pb-6">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="pt-6">
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

export default Register;
