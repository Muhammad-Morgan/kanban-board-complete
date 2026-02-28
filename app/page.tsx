import Link from "next/link";

export default function Home() {
  return (
    <main className="container py-5">
      <div className="d-flex flex-column align-items-start gap-3">
        <h1 className="h3 mb-0">Welcome to your Kanban board</h1>
        <p className="text-body-secondary mb-0">
          Stay on top of every task, from backlog to done.
        </p>
        <Link className="btn btn-primary" href="/tasks">
          View Tasks
        </Link>
      </div>
    </main>
  );
}
