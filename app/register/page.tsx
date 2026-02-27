import Link from "next/link";
import { Sparkles, LayoutGrid, Users } from "lucide-react";
import { Fraunces } from "next/font/google";
import { Button } from "@/components/atom/button";
import RegisterPage from "@/components/page/RegisterPage";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
});
export default async function Register() {
  const session = await auth();
  if (session?.user) redirect("/tasks");
  return (
    <main className="relative min-h-screen overflow-hidden space-bg">
      <div className="pointer-events-none absolute -top-24 left-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 rounded-full bg-secondary/15 blur-3xl" />
      <div className="mx-auto grid min-h-screen max-w-6xl gap-12 px-6 py-12 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-16">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-muted-foreground hover:text-foreground"
            >
              <span className="h-2 w-2 rounded-full bg-primary" />
              Kanban Board
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
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Launch your workspace
          </div>
          <h1
            className={cn(
              display.className,
              "text-4xl font-semibold text-foreground md:text-5xl",
            )}
          >
            Build your kanban workspace in minutes.
          </h1>
          <p className="text-lg text-muted-foreground">
            Create an account to organize tasks, set priorities, and keep your
            team aligned.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Custom columns",
                description:
                  "Shape workflows that match how your team ships.",
                icon: LayoutGrid,
              },
              {
                title: "Team-ready",
                description:
                  "Invite teammates, assign owners, and share updates.",
                icon: Users,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Icon className="h-4 w-4" />
                    </span>
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-5 flex-1 animate-in fade-in slide-in-from-right-6 duration-700 delay-150">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[28px] bg-linear-to-br from-primary/30 via-accent/25 to-secondary/30 opacity-70 blur-2xl" />
            <RegisterPage
              title="Create your Kanban account"
              description="Everything you need to plan, track, and ship."
              className="relative border-border/70 bg-card/80 shadow-xl backdrop-blur"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
