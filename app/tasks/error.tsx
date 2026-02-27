"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function TasksError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasFilters = Array.from(searchParams.entries()).length > 0;

  return (
    <div style={{ padding: 24 }}>
      <h2>Tasks section error</h2>
      <p>
        {process.env.NODE_ENV === "development"
          ? error.message
          : "Please try again."}
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button onClick={() => reset()}>Retry</button>

        {hasFilters && (
          <button onClick={() => router.replace(pathname)}>
            Clear filters
          </button>
        )}

        <button onClick={() => router.push("/tasks")}>Back to tasks</button>
      </div>
    </div>
  );
}
