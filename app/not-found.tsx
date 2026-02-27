// global 404
import Link from "next/link";
import { Button } from "@/components/atom/button";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <div className="flex flex-col items-start gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          404
        </p>
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tasks">View tasks</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
