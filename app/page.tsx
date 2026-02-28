import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Welcome to your Kanban board
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          Stay on top of every task, from backlog to done.
        </p>
        <Link
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          href="/tasks"
        >
          View Tasks
        </Link>
      </div>
    </main>
  );
}
