export default function TasksLoading() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center px-6 py-12">
      <div className="flex flex-col items-center gap-3 text-center">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p className="text-sm text-muted-foreground">Loading tasks...</p>
      </div>
    </main>
  );
}
