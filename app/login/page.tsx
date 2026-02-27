import Link from "next/link";
import { ShieldCheck, Sparkles, Timer } from "lucide-react";
import { Fraunces } from "next/font/google";
import LoginPage from "@/components/page/LoginPage";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default async function Login() {
  const session = await auth();
  if (session?.user) redirect("/tasks");

  return (
    <main className="relative min-h-screen overflow-hidden space-bg">
      <div className="pointer-events-none absolute -top-20 right-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-0 h-80 w-80 -translate-x-1/2 rounded-full bg-secondary/15 blur-3xl" />
      <div className="mx-auto grid min-h-screen max-w-6xl gap-12 px-6 py-12 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-16">
        <div className="lg:col-span-7 flex-1 space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-muted-foreground hover:text-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            Quiz Flow
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Secure sign-in
          </div>
          <h1
            className={cn(
              display.className,
              "text-4xl font-semibold text-foreground md:text-5xl",
            )}
          >
            Welcome back to your quiz workspace.
          </h1>
          <p className="text-lg text-muted-foreground">
            Log in to continue building assessments or taking your next quiz
            session.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Secure sessions",
                description:
                  "Keep attempts protected with stable sessions and timed access.",
                icon: ShieldCheck,
              },
              {
                title: "Guided pacing",
                description:
                  "Timers, autosave, and progress cues keep learners on track.",
                icon: Timer,
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
            <LoginPage
              title="Sign in to Quiz Flow"
              switchCta="New here?"
              switchLabel="Create account"
              switchHref="/register"
              className="relative border-border/70 bg-card/80 shadow-xl backdrop-blur"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
