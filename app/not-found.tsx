// global 404
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container py-5">
      <div className="d-flex flex-column align-items-start gap-3">
        <p className="text-uppercase small text-body-secondary mb-0">404</p>
        <h1 className="h3 mb-0">Page not found</h1>
        <p className="text-body-secondary mb-0">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="d-flex gap-2">
          <Link className="btn btn-primary" href="/">
            Back to home
          </Link>
          <Link className="btn btn-outline-secondary" href="/tasks">
            View tasks
          </Link>
        </div>
      </div>
    </main>
  );
}
