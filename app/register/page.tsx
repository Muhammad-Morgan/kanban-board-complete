import Link from "next/link";
import { Button } from "@/components/atom/button";
import RegisterPage from "@/components/page/RegisterPage";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function Register() {
  const session = await auth();
  if (session?.user) redirect("/tasks");
  return (
    <main className="space-bg relative min-h-screen overflow-hidden">
      <div className="relative mx-auto z-10 flex min-h-screen max-w-5xl flex-col px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-muted-foreground hover:text-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            Quiz Flow
          </Link>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </div>

        <div className="mt-5 w-full max-w-4xl">
          <RegisterPage />
        </div>
      </div>
    </main>
  );
}
