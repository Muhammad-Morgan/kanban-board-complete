import Link from "next/link";
import todoList from "@/public/todo-list.jpg";
import Image from "next/image";
import { ChevronDown, LayoutGrid } from "lucide-react";
import { ModeToggle } from "@/components/molecule/ThemeToggle";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[520px] -translate-x-1/2 rounded-full bg-linear-to-r from-primary/20 via-primary/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-linear-to-br from-secondary/20 via-accent/15 to-transparent blur-3xl" />
      <nav className="border-b border-border/70 bg-muted backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="flex items-center gap-3 text-foreground no-underline"
          >
            <span
              className="grid size-9.5 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm"
              aria-hidden="true"
            >
              <LayoutGrid className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] md:text-base">
              Kanban Board
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              Login
            </Link>
            <ModeToggle />
          </div>
        </div>
      </nav>
      {/* HERO */}
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="grid w-full max-w-6xl gap-16 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Organize Your Work. <br /> Ship Faster.
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              A simple, powerful Kanban workspace for focused teams and solo
              builders.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground/80">
              Plan priorities, keep work visible, and move tasks confidently
              from backlog to done. Built for clarity, speed, and steady
              momentum.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/login"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Get Started
              </Link>
            </div>
            <a
              href="#page-end"
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-muted-foreground transition hover:text-foreground"
            >
              Scroll to End
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </a>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/80 p-2">
            {/* screenshot image here */}
            <Image
              src={todoList}
              alt="todo-list"
              height={400}
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      </section>

      <section id="highlights" className="px-6 pb-20 scroll-mt-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Why it works
            </span>
            <h2 className="text-3xl font-semibold">
              A workflow that stays out of your way
            </h2>
            <p className="text-muted-foreground">
              Keep your board clean and your team aligned. Each column is a
              clear signal, each task tells a story, and progress is always
              visible.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Focus by stage",
                description:
                  "Track what matters right now and keep your backlog tidy.",
              },
              {
                title: "Fast updates",
                description:
                  "Drag, drop, and edit tasks without leaving the board.",
              },
              {
                title: "Team clarity",
                description:
                  "Everyone sees the same truth, from kickoff to delivery.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto w-full max-w-6xl gap-12 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold">
              Built for day-to-day execution
            </h2>
            <p className="mt-4 text-muted-foreground">
              Move tasks through a simple flow, add context when it matters, and
              keep a high-level view without losing detail.
            </p>
            <ol className="mt-6 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-border/70 text-xs text-foreground">
                  1
                </span>
                Capture new work in seconds and keep priorities clear.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-border/70 text-xs text-foreground">
                  2
                </span>
                Move tasks across stages as progress happens.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-border/70 text-xs text-foreground">
                  3
                </span>
                Review outcomes and keep the board continuously fresh.
              </li>
            </ol>
          </div>
          <div className="rounded-3xl border border-border/70 bg-muted p-8 shadow-lg">
            <div className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
              Useful links
            </div>
            <div className="mt-6 grid gap-4 text-sm text-muted-foreground">
              <Link
                href="/tasks"
                className="rounded-xl border border-border/70 bg-card/80 px-4 py-3 transition hover:border-primary/40"
              >
                Open your board
              </Link>
              <Link
                href="/tasks/create-task"
                className="rounded-xl border border-border/70 bg-card/80 px-4 py-3 transition hover:border-primary/40"
              >
                Create a new task
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-border/70 bg-card/80 px-4 py-3 transition hover:border-primary/40"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-xl border border-border/70 bg-card/80 px-4 py-3 transition hover:border-primary/40"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer
        id="page-end"
        className="border-t border-border/70 bg-background/80 px-6 py-12"
      >
        <div className="mx-auto w-full max-w-6xl gap-10 md:grid md:grid-cols-3">
          <div>
            <div className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
              Kanban Workspace
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Keep projects moving with a lightweight, focused board that adapts
              to your team.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Product
            </div>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <Link href="/tasks" className="hover:text-foreground">
                Tasks
              </Link>
              <Link href="/tasks/create-task" className="hover:text-foreground">
                New task
              </Link>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Account
            </div>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <Link href="/login" className="hover:text-foreground">
                Login
              </Link>
              <Link href="/register" className="hover:text-foreground">
                Register
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 w-full max-w-6xl border-t border-border/70 pt-6 text-xs text-muted-foreground">
          © 2026 Kanban Workspace. Built for focused teams.
        </div>
      </footer>
    </main>
  );
}
